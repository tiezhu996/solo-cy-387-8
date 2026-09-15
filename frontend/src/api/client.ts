import type {
  ApiErrorBody,
  ContractCreatePayload,
  ContractItem,
  PropertyItem,
  RepairTicket,
  SettlementItem,
} from '../types/domain';

const API_BASE = '/api';

export class ApiError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

async function parseError(response: Response, fallback: string): Promise<never> {
  try {
    const body = (await response.json()) as ApiErrorBody;
    if (body?.error?.message) throw new ApiError(body.error.code, body.error.message);
  } catch (err) {
    if (err instanceof ApiError) throw err;
  }
  throw new ApiError('UNKNOWN', fallback);
}

async function request<T>(url: string, init: RequestInit | undefined, fallback: string): Promise<T> {
  const response = await fetch(`${API_BASE}${url}`, init);
  if (!response.ok) return parseError(response, fallback);
  return response.json() as Promise<T>;
}

function post<T>(url: string, body: unknown, fallback: string): Promise<T> {
  return request<T>(
    url,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) },
    fallback,
  );
}

export async function getProperties(): Promise<PropertyItem[]> {
  return request<PropertyItem[]>('/properties/', undefined, '房源加载失败');
}

export async function createRepair(ticket: Pick<RepairTicket, 'faultType' | 'description'>): Promise<RepairTicket> {
  return post<RepairTicket>('/repairs/', ticket, '报修提交失败');
}

export async function getContracts(): Promise<ContractItem[]> {
  return request<ContractItem[]>('/contracts/', undefined, '合同加载失败');
}

export async function getContract(id: number): Promise<ContractItem> {
  return request<ContractItem>(`/contracts/${id}/`, undefined, '合同详情加载失败');
}

export async function createContract(payload: ContractCreatePayload): Promise<ContractItem> {
  return post<ContractItem>('/contracts/', payload, '合同创建失败');
}

export async function confirmContract(id: number): Promise<ContractItem> {
  return post<ContractItem>(`/contracts/${id}/confirm/`, {}, '合同确认失败');
}

export async function cancelContract(id: number): Promise<ContractItem> {
  return post<ContractItem>(`/contracts/${id}/cancel/`, {}, '合同取消失败');
}

export async function terminateContract(id: number, actualEndDate: string): Promise<ContractItem> {
  return post<ContractItem>(`/contracts/${id}/terminate/`, { actualEndDate }, '退租办理失败');
}

export async function getSettlement(id: number): Promise<SettlementItem> {
  return request<SettlementItem>(`/contracts/${id}/settlement/`, undefined, '结算单加载失败');
}
