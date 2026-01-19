import type { ContractStatus } from "../types/contract";

export const allowedTransitions: Record<ContractStatus, ContractStatus[]> = {
  CREATED: ["APPROVED", "REVOKED"],
  APPROVED: ["SENT"],
  SENT: ["SIGNED", "REVOKED"],
  SIGNED: ["LOCKED"],
  LOCKED: [],
  REVOKED: [],
};

export const canTransition = (
  from: ContractStatus,
  to: ContractStatus
) => {
  return allowedTransitions[from].includes(to);
};
