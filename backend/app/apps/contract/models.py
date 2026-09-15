from django.db import models

from app.apps.properties.models import Property
from app.constants.enums import CONTRACT_STATUS, CONTRACT_STATUS_PENDING


class Contract(models.Model):
    """租赁合同：房东发起、租客确认后生效，退租后终止。version 随每次状态变更递增。"""

    property = models.ForeignKey(Property, on_delete=models.PROTECT, related_name='contracts')
    tenant_name = models.CharField(max_length=40)
    tenant_phone = models.CharField(max_length=30)
    start_date = models.DateField()
    end_date = models.DateField()
    actual_end_date = models.DateField(null=True, blank=True)
    monthly_rent = models.DecimalField(max_digits=12, decimal_places=2)
    deposit = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, default=CONTRACT_STATUS_PENDING, choices=[(s, s) for s in CONTRACT_STATUS])
    version = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-id']

    def __str__(self) -> str:
        return f'合同#{self.id} 房源{self.property_id} {self.status} v{self.version}'


class Settlement(models.Model):
    """退租结算单：按实际租期重算租金与押金，与合同一一对应。"""

    contract = models.OneToOneField(Contract, on_delete=models.CASCADE, related_name='settlement')
    actual_end_date = models.DateField()
    planned_days = models.PositiveIntegerField()
    actual_days = models.PositiveIntegerField()
    rent_paid = models.DecimalField(max_digits=12, decimal_places=2, help_text='已付租金（按原租期预付）')
    rent_due = models.DecimalField(max_digits=12, decimal_places=2, help_text='按实际租期应付租金')
    unsettled_rent = models.DecimalField(max_digits=12, decimal_places=2, help_text='未结租金（欠付）')
    rent_refund = models.DecimalField(max_digits=12, decimal_places=2, help_text='多付应退租金')
    deposit = models.DecimalField(max_digits=12, decimal_places=2)
    deposit_refund = models.DecimalField(max_digits=12, decimal_places=2, help_text='应退押金')
    total_refund = models.DecimalField(max_digits=12, decimal_places=2, help_text='应退总额')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'结算单#合同{self.contract_id} 应退{self.total_refund}'
