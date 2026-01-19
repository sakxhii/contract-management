// src/components/StatusBadge.tsx
import type { ContractStatus } from '../types/contract';

const statusColors: Record<ContractStatus, string> = {
  CREATED: '#3b82f6',    // blue
  APPROVED: '#10b981',   // green
  SENT: '#f59e0b',       // yellow
  SIGNED: '#8b5cf6',     // purple
  LOCKED: '#6b7280',     // gray
  REVOKED: '#ef4444',    // red
};

interface StatusBadgeProps {
  status: ContractStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span style={{
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: '14px',
      fontWeight: 500,
      backgroundColor: statusColors[status] + '20',
      color: statusColors[status],
      border: `1px solid ${statusColors[status]}40`
    }}>
      {status}
    </span>
  );
}