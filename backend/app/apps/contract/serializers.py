from rest_framework import serializers

from .models import Contract, Settlement


class SettlementSerializer(serializers.ModelSerializer):
    actualEndDate = serializers.DateField(source='actual_end_date')
    plannedDays = serializers.IntegerField(source='planned_days')
    actualDays = serializers.IntegerField(source='actual_days')
    rentPaid = serializers.DecimalField(source='rent_paid', max_digits=12, decimal_places=2)
    rentDue = serializers.DecimalField(source='rent_due', max_digits=12, decimal_places=2)
    unsettledRent = serializers.DecimalField(source='unsettled_rent', max_digits=12, decimal_places=2)
    rentRefund = serializers.DecimalField(source='rent_refund', max_digits=12, decimal_places=2)
    deposit = serializers.DecimalField(max_digits=12, decimal_places=2)
    depositRefund = serializers.DecimalField(source='deposit_refund', max_digits=12, decimal_places=2)
    totalRefund = serializers.DecimalField(source='total_refund', max_digits=12, decimal_places=2)
    createdAt = serializers.DateTimeField(source='created_at')

    class Meta:
        model = Settlement
        fields = [
            'id', 'actualEndDate', 'plannedDays', 'actualDays',
            'rentPaid', 'rentDue', 'unsettledRent', 'rentRefund',
            'deposit', 'depositRefund', 'totalRefund', 'createdAt',
        ]


class ContractSerializer(serializers.ModelSerializer):
    propertyId = serializers.IntegerField(source='property_id')
    community = serializers.CharField(source='property.community', read_only=True)
    region = serializers.CharField(source='property.region', read_only=True)
    propertyStatus = serializers.CharField(source='property.status', read_only=True)
    tenantName = serializers.CharField(source='tenant_name')
    tenantPhone = serializers.CharField(source='tenant_phone')
    startDate = serializers.DateField(source='start_date')
    endDate = serializers.DateField(source='end_date')
    actualEndDate = serializers.DateField(source='actual_end_date')
    monthlyRent = serializers.DecimalField(source='monthly_rent', max_digits=12, decimal_places=2)
    deposit = serializers.DecimalField(max_digits=12, decimal_places=2)
    settlement = SettlementSerializer(read_only=True)
    createdAt = serializers.DateTimeField(source='created_at')
    updatedAt = serializers.DateTimeField(source='updated_at')

    class Meta:
        model = Contract
        fields = [
            'id', 'propertyId', 'community', 'region', 'propertyStatus',
            'tenantName', 'tenantPhone', 'startDate', 'endDate', 'actualEndDate',
            'monthlyRent', 'deposit', 'status', 'version', 'settlement',
            'createdAt', 'updatedAt',
        ]
