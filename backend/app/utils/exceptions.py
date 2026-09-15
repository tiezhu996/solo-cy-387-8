from rest_framework.exceptions import APIException

from app.constants.errors import ERROR_MESSAGES


class BusinessError(APIException):
    """业务异常：携带业务错误码与中文提示，由统一异常处理器输出标准格式。"""

    status_code = 400

    def __init__(self, code: str, message: str | None = None, status_code: int = 400):
        self.business_code = code
        self.message = message or ERROR_MESSAGES.get(code, code)
        self.status_code = status_code
        super().__init__(detail=self.message)
