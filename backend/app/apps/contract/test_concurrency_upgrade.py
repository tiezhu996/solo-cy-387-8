"""合同确认的并发与升级测试。

并发用例必须使用项目真实持久化配置（PostgreSQL）与独立数据库连接：
内存/文件 sqlite 没有行级锁，select_for_update 在其上为空操作，
用它跑并发等于用替身绕开真实行为，因此本模块在 sqlite 下整体跳过。

运行方式（与 docker-compose 一致的真实数据库）：
    DATABASE_URL=postgres://rentfind:rentfind123@localhost:5432/rentfind \
        python manage.py test app.apps.contract.test_concurrency_upgrade

每个用例自行准备并清理数据，连续运行结果一致。
"""

import threading
import unittest
from datetime import date

from django.conf import settings
from django.db import IntegrityError, connections, transaction
from django.db.migrations.executor import MigrationExecutor
from django.test import TransactionTestCase

from app.apps.properties.models import Property
from app.constants.enums import (
    CONTRACT_STATUS_ACTIVE,
    CONTRACT_STATUS_PENDING,
    HOUSE_STATUS_SIGNED,
)
from app.utils.exceptions import BusinessError

from .models import Contract, Settlement
from .services import confirm_contract

MIGRATION_BEFORE_CONSTRAINT = ('contract', '0001_initial')
MIGRATION_WITH_CONSTRAINT = ('contract', '0002_contract_unique_active_contract_per_property')
CONSTRAINT_NAME = 'unique_active_contract_per_property'

IS_SQLITE = 'sqlite' in settings.DATABASES['default']['ENGINE']
SKIP_REASON = '并发与升级测试需要项目真实持久化配置（PostgreSQL），sqlite 无行锁，不能作为替身'


def make_property(**kwargs) -> Property:
    defaults = dict(
        community='并发升级测试小区', region='滨江区', layout='两室一厅', area=80,
        rent=3000, deposit=3000, payment='月付', facilities=['空调'],
        status='待出租', landlord_phone='13800000000',
    )
    defaults.update(kwargs)
    return Property.objects.create(**defaults)


def make_contract(property_obj, status, start, end, tenant='测试租客') -> Contract:
    return Contract.objects.create(
        property=property_obj, tenant_name=tenant, tenant_phone='',
        start_date=start, end_date=end, monthly_rent=3000, deposit=3000, status=status,
    )


@unittest.skipIf(IS_SQLITE, SKIP_REASON)
class ConfirmConcurrencyTests(TransactionTestCase):
    """同一房源两份待确认合同同时确认：只允许一份生效，失败方明确报错且不改数据。"""

    def setUp(self):
        super().setUp()
        self.property = make_property()
        self.contracts = [
            make_contract(self.property, CONTRACT_STATUS_PENDING, date(2026, 1, 1), date(2026, 6, 1), '租客甲'),
            make_contract(self.property, CONTRACT_STATUS_PENDING, date(2026, 7, 1), date(2026, 12, 1), '租客乙'),
        ]
        # 记录确认前的合同快照，用于核对失败请求是否改动了数据
        self.snapshot = {
            c.id: (c.status, c.version, c.updated_at) for c in Contract.objects.filter(property=self.property)
        }

    def tearDown(self):
        try:
            Contract.objects.filter(property_id=self.property.id).delete()
            Property.objects.filter(id=self.property.id).delete()
        finally:
            super().tearDown()

    def test_concurrent_confirm_allows_only_one_active(self):
        barrier = threading.Barrier(2)
        outcomes = {}

        def worker(contract_id):
            connection = connections['default']  # 当前线程的独立连接
            try:
                barrier.wait(timeout=10)
                confirm_contract(contract_id)
                outcomes[contract_id] = {'result': 'ok'}
            except BusinessError as exc:
                outcomes[contract_id] = {'result': 'error', 'code': exc.business_code, 'message': exc.message}
            finally:
                # 记录后端进程 PID，证明两个请求走的是独立连接
                outcomes[contract_id]['backend_pid'] = connection.connection.info.backend_pid
                connection.close()

        threads = [threading.Thread(target=worker, args=(c.id,)) for c in self.contracts]
        for thread in threads:
            thread.start()
        for thread in threads:
            thread.join()

        # 两个请求使用了两个独立的数据库连接
        self.assertEqual(len({o['backend_pid'] for o in outcomes.values()}), 2)

        # 恰好一份成功，另一份收到明确错误
        results = sorted(o['result'] for o in outcomes.values())
        self.assertEqual(results, ['error', 'ok'])
        loser_id = next(cid for cid, o in outcomes.items() if o['result'] == 'error')
        winner_id = next(cid for cid, o in outcomes.items() if o['result'] == 'ok')
        self.assertEqual(outcomes[loser_id]['code'], 'CONTRACT_DUPLICATE')
        self.assertEqual(outcomes[loser_id]['message'], '该房源已存在生效合同，不能重复签署')

        # 失败请求未改动合同：状态、版本、更新时间与确认前一致，且无结算单
        loser = Contract.objects.get(id=loser_id)
        old_status, old_version, old_updated_at = self.snapshot[loser_id]
        self.assertEqual(loser.status, old_status)
        self.assertEqual(loser.version, old_version)
        self.assertEqual(loser.updated_at, old_updated_at)
        self.assertFalse(Settlement.objects.filter(contract_id=loser_id).exists())

        # 成功合同正常生效
        winner = Contract.objects.get(id=winner_id)
        self.assertEqual(winner.status, CONTRACT_STATUS_ACTIVE)
        self.assertEqual(winner.version, 2)

        # 数据库层同一房源只有一份生效合同，房源状态与之同步
        self.assertEqual(
            Contract.objects.filter(property=self.property, status=CONTRACT_STATUS_ACTIVE).count(), 1,
        )
        self.property.refresh_from_db()
        self.assertEqual(self.property.status, HOUSE_STATUS_SIGNED)


@unittest.skipIf(IS_SQLITE, SKIP_REASON)
class ConfirmUpgradeMigrationTests(TransactionTestCase):
    """旧库已存在重复生效合同时，升级（应用唯一约束迁移）的状态与失败阶段。"""

    def setUp(self):
        super().setUp()
        # 回到还没有唯一约束的旧版本，模拟待升级的旧库
        MigrationExecutor(connections['default']).migrate([MIGRATION_BEFORE_CONSTRAINT])
        self.property = make_property(status=HOUSE_STATUS_SIGNED)

    def tearDown(self):
        try:
            # 先清掉自建数据（含可能的重复生效合同），再恢复到最新迁移，
            # 保证无论用例成败，连续运行结果一致
            Contract.objects.filter(property_id=self.property.id).delete()
            Property.objects.filter(id=self.property.id).delete()
            executor = MigrationExecutor(connections['default'])
            leafs = [node for node in executor.loader.graph.leaf_nodes() if node[0] == 'contract']
            executor.migrate(leafs)
        finally:
            super().tearDown()

    def applied_contract_migrations(self) -> set:
        recorder = MigrationExecutor(connections['default']).recorder
        return {name for app, name in recorder.applied_migrations() if app == 'contract'}

    def test_upgrade_fails_with_legacy_duplicate_active_contracts(self):
        # 旧库脏数据：同一房源两份生效合同（绕过业务层直接落库）
        make_contract(self.property, CONTRACT_STATUS_ACTIVE, date(2025, 1, 1), date(2025, 6, 1), '旧租客甲')
        dup2 = make_contract(self.property, CONTRACT_STATUS_ACTIVE, date(2025, 7, 1), date(2025, 12, 1), '旧租客乙')

        # 执行升级：必须在唯一约束创建阶段失败
        with self.assertRaises(IntegrityError) as ctx:
            MigrationExecutor(connections['default']).migrate([MIGRATION_WITH_CONSTRAINT])
        self.assertIn(CONSTRAINT_NAME, str(ctx.exception))

        # 失败阶段状态：约束迁移未被记录为已应用，停留在旧版本
        self.assertEqual(self.applied_contract_migrations(), {MIGRATION_BEFORE_CONSTRAINT[1]})
        # 失败未改动历史数据：两份生效合同与房源状态原样保留
        self.assertEqual(
            Contract.objects.filter(property=self.property, status=CONTRACT_STATUS_ACTIVE).count(), 2,
        )
        self.property.refresh_from_db()
        self.assertEqual(self.property.status, HOUSE_STATUS_SIGNED)

        # 清理脏数据后重新升级：成功且约束生效
        Contract.objects.filter(id=dup2.id).update(status=CONTRACT_STATUS_PENDING)
        MigrationExecutor(connections['default']).migrate([MIGRATION_WITH_CONSTRAINT])
        self.assertEqual(
            self.applied_contract_migrations(),
            {MIGRATION_BEFORE_CONSTRAINT[1], MIGRATION_WITH_CONSTRAINT[1]},
        )
        with self.assertRaises(IntegrityError):
            with transaction.atomic():  # 保存点：仅回滚这条违规写入
                make_contract(self.property, CONTRACT_STATUS_ACTIVE, date(2026, 1, 1), date(2026, 6, 1))
        # 已修复的历史数据保持修复后的状态
        self.assertEqual(Contract.objects.get(id=dup2.id).status, CONTRACT_STATUS_PENDING)

    def test_upgrade_succeeds_on_clean_legacy_data(self):
        # 旧库正常数据：一份生效 + 一份待确认，升级应直接成功
        active = make_contract(self.property, CONTRACT_STATUS_ACTIVE, date(2025, 1, 1), date(2025, 6, 1))
        pending = make_contract(self.property, CONTRACT_STATUS_PENDING, date(2025, 7, 1), date(2025, 12, 1))

        MigrationExecutor(connections['default']).migrate([MIGRATION_WITH_CONSTRAINT])
        self.assertEqual(
            self.applied_contract_migrations(),
            {MIGRATION_BEFORE_CONSTRAINT[1], MIGRATION_WITH_CONSTRAINT[1]},
        )

        # 历史数据不受升级影响
        self.assertEqual(Contract.objects.get(id=active.id).status, CONTRACT_STATUS_ACTIVE)
        self.assertEqual(Contract.objects.get(id=pending.id).status, CONTRACT_STATUS_PENDING)
        # 约束生效：升级后不允许再出现第二份生效合同
        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                make_contract(self.property, CONTRACT_STATUS_ACTIVE, date(2026, 1, 1), date(2026, 6, 1))
