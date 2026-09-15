const API_BASE = '/api';
export class ApiError extends Error {
    constructor(code, message) {
        super(message);
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.code = code;
    }
}
async function parseError(response, fallback) {
    try {
        const body = (await response.json());
        if (body?.error?.message)
            throw new ApiError(body.error.code, body.error.message);
    }
    catch (err) {
        if (err instanceof ApiError)
            throw err;
    }
    throw new ApiError('UNKNOWN', fallback);
}
async function request(url, init, fallback) {
    const response = await fetch(`${API_BASE}${url}`, init);
    if (!response.ok)
        return parseError(response, fallback);
    return response.json();
}
function post(url, body, fallback) {
    return request(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }, fallback);
}
export async function getProperties() {
    return request('/properties/', undefined, '房源加载失败');
}
export async function createRepair(ticket) {
    return post('/repairs/', ticket, '报修提交失败');
}
export async function getContracts() {
    return request('/contracts/', undefined, '合同加载失败');
}
export async function getContract(id) {
    return request(`/contracts/${id}/`, undefined, '合同详情加载失败');
}
export async function createContract(payload) {
    return post('/contracts/', payload, '合同创建失败');
}
export async function confirmContract(id) {
    return post(`/contracts/${id}/confirm/`, {}, '合同确认失败');
}
export async function cancelContract(id) {
    return post(`/contracts/${id}/cancel/`, {}, '合同取消失败');
}
export async function terminateContract(id, actualEndDate) {
    return post(`/contracts/${id}/terminate/`, { actualEndDate }, '退租办理失败');
}
export async function getSettlement(id) {
    return request(`/contracts/${id}/settlement/`, undefined, '结算单加载失败');
}
