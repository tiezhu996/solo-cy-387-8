from rest_framework.response import Response
from rest_framework.views import APIView

from app.utils.exceptions import BusinessError

from .models import Contract
from .serializers import ContractSerializer, SettlementSerializer
from .services import cancel_contract, confirm_contract, create_contract, terminate_contract


def _serialize(contract: Contract) -> dict:
    return ContractSerializer(contract).data


class ContractListView(APIView):
    """合同列表与房东发起合同。"""

    def get(self, request):
        contracts = Contract.objects.select_related('property', 'settlement').all()
        return Response([_serialize(c) for c in contracts])

    def post(self, request):
        data = request.data
        missing = [k for k in ('propertyId', 'tenantName', 'startDate', 'endDate', 'monthlyRent', 'deposit') if data.get(k) in (None, '')]
        if missing:
            raise BusinessError('VALIDATION_ERROR', f'缺少必填字段：{", ".join(missing)}')
        contract = create_contract(
            property_id=data.get('propertyId'),
            tenant_name=data.get('tenantName'),
            tenant_phone=data.get('tenantPhone', ''),
            start_date=data.get('startDate'),
            end_date=data.get('endDate'),
            monthly_rent=data.get('monthlyRent'),
            deposit=data.get('deposit'),
        )
        return Response(_serialize(contract), status=201)


class ContractDetailView(APIView):
    """合同详情（含结算单与最新房源状态）。"""

    def get(self, request, contract_id: int):
        contract = Contract.objects.select_related('property', 'settlement').filter(id=contract_id).first()
        if contract is None:
            raise BusinessError('CONTRACT_NOT_FOUND', status_code=404)
        return Response(_serialize(contract))


class ContractConfirmView(APIView):
    """租客确认合同，合同生效。"""

    def post(self, request, contract_id: int):
        return Response(_serialize(confirm_contract(contract_id)))


class ContractCancelView(APIView):
    """取消待确认合同。"""

    def post(self, request, contract_id: int):
        return Response(_serialize(cancel_contract(contract_id)))


class ContractTerminateView(APIView):
    """退租：记录实际退租日并生成结算单。"""

    def post(self, request, contract_id: int):
        actual_end_date = request.data.get('actualEndDate')
        if not actual_end_date:
            raise BusinessError('VALIDATION_ERROR', '缺少必填字段：actualEndDate')
        contract = terminate_contract(contract_id, actual_end_date)
        return Response(_serialize(contract))


class ContractSettlementView(APIView):
    """结算单查询。"""

    def get(self, request, contract_id: int):
        contract = Contract.objects.filter(id=contract_id).first()
        if contract is None:
            raise BusinessError('CONTRACT_NOT_FOUND', status_code=404)
        settlement = getattr(contract, 'settlement', None)
        if settlement is None:
            raise BusinessError('SETTLEMENT_NOT_FOUND', status_code=404)
        return Response(SettlementSerializer(settlement).data)
