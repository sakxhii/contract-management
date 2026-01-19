import type { Field } from "./blueprint";

export type ContractStatus =
  | "CREATED"
  | "APPROVED"
  | "SENT"
  | "SIGNED"
  | "LOCKED"
  | "REVOKED";

export interface Contract {
  id: string;
  name: string;
  blueprintId: string;
  fields: (Field & { value?: string | boolean })[];
  status: ContractStatus;
  createdAt: string;
}
