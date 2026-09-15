from datetime import date
from decimal import Decimal, ROUND_HALF_UP

from django.db import transaction
from django.utils import timezone

from app.apps.properties.models import Property
from app.constants.enums import (
    CONTRACT_STATUS_ACTIVE,
    CONTRACT_STATUS_CANCELLED,
    CONTRACT_STATUS_PENDING,
    CONTRACT_STATUS_TERMINATED,
    HOUSE_STATUS_PENDING,
    HOUSE_STATUS_SIGNED,
)
from app.utils.exceptions import BusinessError
from app.utils.logger import get_logger

from .models import Contract, Settlement

logger = get_logger('contract')

DAYS_PER_MONTH = Decimal('30')
CENT = Decimal('0.01')


def _parse_date(value, field_label: str) -> date:
    if isinstance(value, date):
        return value
    try:
        return date.fromisoformat(str(value))
    except (TypeError, ValueError):
        raise BusinessError('CONTRACT_INVALID_DATE', f'{field_label}格式无效，应为 YYYY-MM-DD')


def _quantize(amount: Decimal) -> Decimal:
    return amount.quantize(CENT, rounding=ROUND_HALF_UP)


def compute_settlement_amounts(contract: Contract, actual_end_date: date) -> dict:
    """按实际租期重算租金与押金。

    已付租金按原合同租期全额预付计算；实际应付按实际租住天数折算（月租金/30）。
    未结租金优先从押金中抵扣，多付租金与抵扣后押金一并退还租客。
    """
    planned_days = (contract.end_date - contract.start_date).days
    actual_days = (actual_end_date - contract.start_date).days
    daily_rent = contract.monthly_rent / DAYS_PER_MONTH
    rent_paid = _quantize(daily_rent * planned_days)
    rent_due = _quantize(daily_rent * actual_days)
    unsettled_rent = max(Decimal('0'), rent_due - rent_paid)
    rent_refund = max(Decimal('0'), rent_paid - rent_due)
    deposit_refund = max(Decimal('0'), contract.deposit - unsettled_rent)
    total_refund = deposit_refund + rent_refund
    return {
        'planned_days': planned_days,
        'actual_days': actual_days,
        'rent_paid': rent_paid,
        'rent_due': rent_due,
        'unsettled_rent': unsettled_rent,
        'rent_refund': rent_refund,
        'deposit': contract.deposit,
        'deposit_refund': deposit_refund,
        'total_refund': total_refund,
    }


def _assert_no_overlap(property_obj: Property, start_date: date, end_date: date) -> None:
    overlapping = (
        property_obj.contracts.filter(status__in=[CONTRACT_STATUS_PENDING, CONTRACT_STATUS_ACTIVE])
        .filter(start_date__lte=end_date, end_date__gte=start_date)
        .exists()
    )
    if overlapping:
        raise BusinessError('CONTRACT_LEASE_OVERLAP', '同一房源在选定租期内已存在合同，租期重叠')


@transaction.atomic
def create_contract(*, property_id: int, tenant_name: str, tenant_phone: str,
                    start_date, end_date, monthly_rent, deposit) -> Contract:
    start = _parse_date(start_date, '起租日期')
    end = _parse_date(end_date, '到期日期')
    if end <= start:
        raise BusinessError('CONTRACT_INVALID_DATE', '到期日期必须晚于起租日期')

    try:
        rent = Decimal(str(monthly_rent))
        dep = Decimal(str(deposit))
    except Exception:
        raise BusinessError('VALIDATION_ERROR', '租金或押金格式无效')
    if rent <= 0:
        raise BusinessError('VALIDATION_ERROR', '月租金必须大于 0')
    if dep < 0:
        raise BusinessError('VALIDATION_ERROR', '押金不能为负数')
    if not tenant_name or not str(tenant_name).strip():
        raise BusinessError('VALIDATION_ERROR', '租客姓名不能为空')

    property_obj = Property.objects.select_for_update().filter(id=property_id).first()
    if property_obj is None:
        raise BusinessError('PROPERTY_NOT_FOUND', status_code=404)
    if property_obj.status == HOUSE_STATUS_SIGNED:
        raise BusinessError('CONTRACT_DUPLICATE')
    _assert_no_overlap(property_obj, start, end)

    contract = Contract.objects.create(
        property=property_obj,
        tenant_name=str(tenant_name).strip(),
        tenant_phone=str(tenant_phone or '').strip(),
        start_date=start,
        end_date=end,
        monthly_rent=rent,
        deposit=dep,
    )
    logger.info('创建合同 contract=%s property=%s 租期=%s~%s', contract.id, property_obj.id, start, end)
    return contract


def _get_contract_locked(contract_id: int) -> Contract:
    contract = Contract.objects.select_for_update().filter(id=contract_id).first()
    if contract is None:
        raise BusinessError('CONTRACT_NOT_FOUND', status_code=404)
    return contract


def _assert_not_terminated(contract: Contract) -> None:
    if contract.status == CONTRACT_STATUS_TERMINATED:
        raise BusinessError('CONTRACT_ALREADY_TERMINATED')


@transaction.atomic
def confirm_contract(contract_id: int) -> Contract:
    """租客确认：合同生效，房源转为已签约。"""
    contract = _get_contract_locked(contract_id)
    _assert_not_terminated(contract)
    if contract.status != CONTRACT_STATUS_PENDING:
        raise BusinessError('CONTRACT_STATUS_INVALID', f'合同当前状态为{contract.status}，仅待确认合同可确认')

    contract.status = CONTRACT_STATUS_ACTIVE
    contract.version += 1
    contract.save(update_fields=['status', 'version', 'updated_at'])

    Property.objects.filter(id=contract.property_id).update(status=HOUSE_STATUS_SIGNED)
    logger.info('合同生效 contract=%s property=%s 已签约', contract.id, contract.property_id)
    return contract


@transaction.atomic
def cancel_contract(contract_id: int) -> Contract:
    """取消待确认合同。"""
    contract = _get_contract_locked(contract_id)
    _assert_not_terminated(contract)
    if contract.status != CONTRACT_STATUS_PENDING:
        raise BusinessError('CONTRACT_STATUS_INVALID', f'合同当前状态为{contract.status}，仅待确认合同可取消')

    contract.status = CONTRACT_STATUS_CANCELLED
    contract.version += 1
    contract.save(update_fields=['status', 'version', 'updated_at'])
    logger.info('合同取消 contract=%s', contract.id)
    return contract


@transaction.atomic
def terminate_contract(contract_id: int, actual_end_date) -> Contract:
    """退租：记录实际退租日，生成结算单，房源恢复待出租。"""
    contract = _get_contract_locked(contract_id)
    _assert_not_terminated(contract)
    if contract.status != CONTRACT_STATUS_ACTIVE:
        raise BusinessError('CONTRACT_STATUS_INVALID', f'合同当前状态为{contract.status}，仅已生效合同可退租')

    actual_end = _parse_date(actual_end_date, '实际退租日')
    if actual_end < contract.start_date:
        raise BusinessError('CONTRACT_INVALID_DATE', '实际退租日不能早于起租日期')
    if actual_end > timezone.localdate():
        raise BusinessError('CONTRACT_INVALID_DATE', '实际退租日不能晚于今天')

    amounts = compute_settlement_amounts(contract, actual_end)
    Settlement.objects.create(contract=contract, actual_end_date=actual_end, **amounts)

    contract.status = CONTRACT_STATUS_TERMINATED
    contract.actual_end_date = actual_end
    contract.version += 1
    contract.save(update_fields=['status', 'actual_end_date', 'version', 'updated_at'])

    still_active = (
        Contract.objects.filter(property_id=contract.property_id, status=CONTRACT_STATUS_ACTIVE)
        .exclude(id=contract.id)
        .exists()
    )
    if not still_active:
        Property.objects.filter(id=contract.property_id).update(status=HOUSE_STATUS_PENDING)
    logger.info(
        '合同终止 contract=%s 实际退租日=%s 未结租金=%s 应退押金=%s',
        contract.id, actual_end, amounts['unsettled_rent'], amounts['deposit_refund'],
    )
    return contract
