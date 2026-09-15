export interface PropertyItem {
  id: number;
  community: string;
  region: string;
  layout: string;
  area: number;
  rent: number;
  deposit: number;
  payment: string;
  facilities: string[];
  status: string;
  landlordPhone: string;
}

export interface RepairTicket {
  id: number;
  faultType: string;
  description: string;
  status: string;
}

export interface SettlementItem {
  id: number;
  actualEndDate: string;
  plannedDays: number;
  actualDays: number;
  rentPaid: string;
  rentDue: string;
  unsettledRent: string;
  rentRefund: string;
  deposit: string;
  depositRefund: string;
  totalRefund: string;
  createdAt: string;
}

export interface ContractItem {
  id: number;
  propertyId: number;
  community: string;
  region: string;
  propertyStatus: string;
  tenantName: string;
  tenantPhone: string;
  startDate: string;
  endDate: string;
  actualEndDate: string | null;
  monthlyRent: string;
  deposit: string;
  status: string;
  version: number;
  settlement: SettlementItem | null;
  createdAt: string;
  updatedAt: string;
}

export interface ContractCreatePayload {
  propertyId: number;
  tenantName: string;
  tenantPhone: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  deposit: number;
}

export interface ApiErrorBody {
  success: false;
  code: number;
  data: null;
  error: { code: string; message: string };
}
