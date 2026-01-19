import type { ContractStatus } from "../types/contract";

const statusColors: Record<ContractStatus, { bg: string; text: string }> = {
  CREATED: { bg: "#e5e7eb", text: "#111827" },
  APPROVED: { bg: "#dbeafe", text: "#1d4ed8" },
  SENT: { bg: "#ffedd5", text: "#9a3412" },
  SIGNED: { bg: "#dcfce7", text: "#166534" },
  LOCKED: { bg: "#e5e7eb", text: "#374151" },
  REVOKED: { bg: "#fee2e2", text: "#991b1b" },
};

export default function StatusBadge({ status }: { status: ContractStatus }) {
  const colors = statusColors[status];

  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 600,
        backgroundColor: colors.bg,
        color: colors.text,
        display: "inline-block",
      }}
    >
      {status}
    </span>
  );
}
