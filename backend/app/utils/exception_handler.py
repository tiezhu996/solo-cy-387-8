from rest_framework.views import exception_handler

from app.constants.errors import ERROR_MESSAGES
from app.utils.exceptions import BusinessError


def standard_exception_handler(exc, context):
    """统一返回 {success, code, data, error:{code, message}} 标准格式。"""
    if isinstance(exc, BusinessError):
        from rest_framework.response import Response

        return Response(
            {
                'success': False,
                'code': exc.status_code,
                'data': None,
                'error': {'code': exc.business_code, 'message': exc.message},
            },
            status=exc.status_code,
        )

    response = exception_handler(exc, context)
    if response is None:
        return response

    detail = response.data
    if isinstance(detail, dict):
        message = detail.get('detail') or next(iter(detail.values()), ERROR_MESSAGES['VALIDATION_ERROR'])
        if isinstance(message, (list, tuple)):
            message = message[0] if message else ERROR_MESSAGES['VALIDATION_ERROR']
    else:
        message = str(detail)
    response.data = {
        'success': False,
        'code': response.status_code,
        'data': None,
        'error': {'code': 'VALIDATION_ERROR', 'message': str(message)},
    }
    return response
