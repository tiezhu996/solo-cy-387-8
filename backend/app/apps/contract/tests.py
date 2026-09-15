from datetime import date, timedelta
from decimal import Decimal

from django.utils import timezone
from rest_framework.test import APITestCase

from app.apps.properties.models import Property
from app.constants.enums import (
    CONTRACT_STATUS_ACTIVE,
    CONTRACT_STATUS_CANCELLED,
    CONTRACT_STATUS_PENDING,
    CONTRACT_STATUS_TERMINATED,
    HOUSE_STATUS_PENDING,
    HOUSE_STATUS_SIGNED,
)

from .models import Contract, Settlement

TODAY = timezone.localdate()


def make_property(**kwargs) -> Property:
    defaults = dict(
        community='测试小区', region='滨江区', layout='两室一厅', area=80,
        rent=3000, deposit=3000, payment='月付', facilities=['空调'],
        status=HOUSE_STATUS_PENDING, landlord_phone='13800000000',
    )
    defaults.update(kwargs)
    return Property.objects.create(**defaults)


def contract_payload(property_id, **kwargs) -> dict:
    payload = {
        'propertyId': property_id,
        'tenantName': '陈晨',
        'tenantPhone': '13900000000',
        'startDate': '2026-01-01',
        'endDate': '2026-07-01',
        'monthlyRent': 3000,
        'deposit': 3000,
    }
    payload.update(kwargs)
    return payload


class ContractCreateTests(APITestCase):
    def setUp(self):
        self.property = make_property()

    def test_create_contract_success(self):
        resp = self.client.post('/api/contracts/', contract_payload(self.property.id), format='json')
        self.assertEqual(resp.status_code, 201)
        data = resp.json()
        self.assertEqual(data['status'], CONTRACT_STATUS_PENDING)
        self.assertEqual(data['version'], 1)
        self.assertEqual(data['tenantName'], '陈晨')
        self.assertEqual(data['community'], '测试小区')
        # 发起合同后房源状态不变，待租客确认
        self.property.refresh_from_db()
        self.assertEqual(self.property.status, HOUSE_STATUS_PENDING)

    def test_create_with_invalid_date_order(self):
        resp = self.client.post(
            '/api/contracts/',
            contract_payload(self.property.id, startDate='2026-07-01', endDate='2026-01-01'),
            format='json',
        )
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(resp.json()['error']['code'], 'CONTRACT_INVALID_DATE')

    def test_create_with_malformed_date(self):
        resp = self.client.post(
            '/api/contracts/',
            contract_payload(self.property.id, startDate='2026年1月1日'),
            format='json',
        )
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(resp.json()['error']['code'], 'CONTRACT_INVALID_DATE')

    def test_create_with_missing_field(self):
        payload = contract_payload(self.property.id)
        del payload['tenantName']
        resp = self.client.post('/api/contracts/', payload, format='json')
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(resp.json()['error']['code'], 'VALIDATION_ERROR')

    def test_create_with_nonexistent_property(self):
        resp = self.client.post('/api/contracts/', contract_payload(99999), format='json')
        self.assertEqual(resp.status_code, 404)
        self.assertEqual(resp.json()['error']['code'], 'PROPERTY_NOT_FOUND')

    def test_create_overlapping_lease_rejected(self):
        self.client.post('/api/contracts/', contract_payload(self.property.id), format='json')
        resp = self.client.post(
            '/api/contracts/',
            contract_payload(self.property.id, startDate='2026-03-01', endDate='2026-09-01'),
            format='json',
        )
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(resp.json()['error']['code'], 'CONTRACT_LEASE_OVERLAP')

    def test_create_adjacent_lease_allowed(self):
        self.client.post('/api/contracts/', contract_payload(self.property.id), format='json')
        resp = self.client.post(
            '/api/contracts/',
            contract_payload(self.property.id, startDate='2026-07-02', endDate='2026-12-31'),
            format='json',
        )
        self.assertEqual(resp.status_code, 201)

    def test_create_duplicate_when_property_signed(self):
        self.property.status = HOUSE_STATUS_SIGNED
        self.property.save()
        resp = self.client.post(
            '/api/contracts/',
            contract_payload(self.property.id, startDate='2027-01-01', endDate='2027-12-01'),
            format='json',
        )
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(resp.json()['error']['code'], 'CONTRACT_DUPLICATE')


class ContractConfirmTests(APITestCase):
    def setUp(self):
        self.property = make_property()
        resp = self.client.post('/api/contracts/', contract_payload(self.property.id), format='json')
        self.contract_id = resp.json()['id']

    def test_confirm_activates_contract_and_signs_property(self):
        resp = self.client.post(f'/api/contracts/{self.contract_id}/confirm/')
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(data['status'], CONTRACT_STATUS_ACTIVE)
        self.assertEqual(data['version'], 2)
        self.property.refresh_from_db()
        self.assertEqual(self.property.status, HOUSE_STATUS_SIGNED)

    def test_confirm_twice_rejected(self):
        self.client.post(f'/api/contracts/{self.contract_id}/confirm/')
        resp = self.client.post(f'/api/contracts/{self.contract_id}/confirm/')
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(resp.json()['error']['code'], 'CONTRACT_STATUS_INVALID')

    def test_confirm_nonexistent_contract(self):
        resp = self.client.post('/api/contracts/99999/confirm/')
        self.assertEqual(resp.status_code, 404)
        self.assertEqual(resp.json()['error']['code'], 'CONTRACT_NOT_FOUND')

    def test_cancel_pending_contract(self):
        resp = self.client.post(f'/api/contracts/{self.contract_id}/cancel/')
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(data['status'], CONTRACT_STATUS_CANCELLED)
        self.assertEqual(data['version'], 2)
        # 取消后房源可再次发起合同
        resp = self.client.post(
            '/api/contracts/',
            contract_payload(self.property.id, startDate='2026-08-01', endDate='2027-02-01'),
            format='json',
        )
        self.assertEqual(resp.status_code, 201)


class ContractTerminateTests(APITestCase):
    def setUp(self):
        self.property = make_property()
        resp = self.client.post('/api/contracts/', contract_payload(self.property.id), format='json')
        self.contract_id = resp.json()['id']
        self.client.post(f'/api/contracts/{self.contract_id}/confirm/')

    def test_terminate_generates_settlement_and_frees_property(self):
        resp = self.client.post(
            f'/api/contracts/{self.contract_id}/terminate/',
            {'actualEndDate': '2026-04-01'},
            format='json',
        )
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(data['status'], CONTRACT_STATUS_TERMINATED)
        self.assertEqual(data['version'], 3)
        self.assertEqual(data['actualEndDate'], '2026-04-01')

        settlement = data['settlement']
        # 月租 3000，日租 100；原租期 181 天已付 18100，实际 90 天应付 9000
        self.assertEqual(Decimal(settlement['rentPaid']), Decimal('18100.00'))
        self.assertEqual(Decimal(settlement['rentDue']), Decimal('9000.00'))
        self.assertEqual(Decimal(settlement['unsettledRent']), Decimal('0.00'))
        self.assertEqual(Decimal(settlement['rentRefund']), Decimal('9100.00'))
        self.assertEqual(Decimal(settlement['depositRefund']), Decimal('3000.00'))
        self.assertEqual(Decimal(settlement['totalRefund']), Decimal('12100.00'))

        self.property.refresh_from_db()
        self.assertEqual(self.property.status, HOUSE_STATUS_PENDING)

    def test_terminate_overstay_deducts_from_deposit(self):
        resp = self.client.post(
            f'/api/contracts/{self.contract_id}/terminate/',
            {'actualEndDate': '2026-08-15'},
            format='json',
        )
        self.assertEqual(resp.status_code, 200)
        settlement = resp.json()['settlement']
        # 实际 226 天应付 22600，已付 18100，欠付 4500 超过押金 3000
        self.assertEqual(Decimal(settlement['rentDue']), Decimal('22600.00'))
        self.assertEqual(Decimal(settlement['unsettledRent']), Decimal('4500.00'))
        self.assertEqual(Decimal(settlement['rentRefund']), Decimal('0.00'))
        self.assertEqual(Decimal(settlement['depositRefund']), Decimal('0.00'))
        self.assertEqual(Decimal(settlement['totalRefund']), Decimal('0.00'))

    def test_terminate_twice_rejected(self):
        self.client.post(
            f'/api/contracts/{self.contract_id}/terminate/',
            {'actualEndDate': '2026-04-01'},
            format='json',
        )
        resp = self.client.post(
            f'/api/contracts/{self.contract_id}/terminate/',
            {'actualEndDate': '2026-05-01'},
            format='json',
        )
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(resp.json()['error']['code'], 'CONTRACT_ALREADY_TERMINATED')
        # 结算单仍只有一份
        self.assertEqual(Settlement.objects.filter(contract_id=self.contract_id).count(), 1)

    def test_terminated_contract_cannot_confirm_or_cancel(self):
        self.client.post(
            f'/api/contracts/{self.contract_id}/terminate/',
            {'actualEndDate': '2026-04-01'},
            format='json',
        )
        for action in ('confirm', 'cancel'):
            resp = self.client.post(f'/api/contracts/{self.contract_id}/{action}/')
            self.assertEqual(resp.status_code, 400)
            self.assertEqual(resp.json()['error']['code'], 'CONTRACT_ALREADY_TERMINATED')

    def test_terminate_with_date_before_start(self):
        resp = self.client.post(
            f'/api/contracts/{self.contract_id}/terminate/',
            {'actualEndDate': '2025-12-01'},
            format='json',
        )
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(resp.json()['error']['code'], 'CONTRACT_INVALID_DATE')

    def test_terminate_with_future_date(self):
        future = (TODAY + timedelta(days=7)).isoformat()
        resp = self.client.post(
            f'/api/contracts/{self.contract_id}/terminate/',
            {'actualEndDate': future},
            format='json',
        )
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(resp.json()['error']['code'], 'CONTRACT_INVALID_DATE')

    def test_terminate_pending_contract_rejected(self):
        resp = self.client.post('/api/contracts/', contract_payload(
            make_property(community='另一套').id,
        ), format='json')
        pending_id = resp.json()['id']
        resp = self.client.post(
            f'/api/contracts/{pending_id}/terminate/',
            {'actualEndDate': '2026-04-01'},
            format='json',
        )
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(resp.json()['error']['code'], 'CONTRACT_STATUS_INVALID')


class ContractPersistenceTests(APITestCase):
    """模拟刷新/重新进入：操作完成后重新拉取，版本、结算、房源状态必须一致可见。"""

    def test_state_visible_after_refetch(self):
        property_obj = make_property()
        resp = self.client.post('/api/contracts/', contract_payload(property_obj.id), format='json')
        contract_id = resp.json()['id']
        self.client.post(f'/api/contracts/{contract_id}/confirm/')
        self.client.post(
            f'/api/contracts/{contract_id}/terminate/',
            {'actualEndDate': '2026-04-01'},
            format='json',
        )

        detail = self.client.get(f'/api/contracts/{contract_id}/').json()
        self.assertEqual(detail['status'], CONTRACT_STATUS_TERMINATED)
        self.assertEqual(detail['version'], 3)
        self.assertEqual(detail['propertyStatus'], HOUSE_STATUS_PENDING)
        self.assertIsNotNone(detail['settlement'])
        self.assertEqual(Decimal(detail['settlement']['totalRefund']), Decimal('12100.00'))

        settlement = self.client.get(f'/api/contracts/{contract_id}/settlement/')
        self.assertEqual(settlement.status_code, 200)
        self.assertEqual(settlement.json()['actualEndDate'], '2026-04-01')

        listing = self.client.get('/api/contracts/').json()
        self.assertEqual(len(listing), 1)
        self.assertEqual(listing[0]['version'], 3)

        properties = self.client.get('/api/properties/').json()
        mine = next(p for p in properties if p['id'] == property_obj.id)
        self.assertEqual(mine['status'], HOUSE_STATUS_PENDING)

    def test_settlement_not_found_before_termination(self):
        property_obj = make_property()
        resp = self.client.post('/api/contracts/', contract_payload(property_obj.id), format='json')
        contract_id = resp.json()['id']
        resp = self.client.get(f'/api/contracts/{contract_id}/settlement/')
        self.assertEqual(resp.status_code, 404)
        self.assertEqual(resp.json()['error']['code'], 'SETTLEMENT_NOT_FOUND')
