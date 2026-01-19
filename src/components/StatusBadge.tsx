// src/components/StatusBadge.tsx
import type { ContractStatus } from '../types/contract';

const statusConfig: Record<ContractStatus, { color: string; icon: string; bg: string }> = {
    CREATED: {
        color: '#3b82f6',
        icon: '📄',
        bg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05))'
    },
    APPROVED: {
        color: '#10b981',
        icon: '✅',
        bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))'
    },
    SENT: {
        color: '#f59e0b',
        icon: '📤',
        bg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05))'
    },
    SIGNED: {
        color: '#8b5cf6',
        icon: '✍️',
        bg: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05))'
    },
    LOCKED: {
        color: '#6b7280',
        icon: '🔒',
        bg: 'linear-gradient(135deg, rgba(107, 114, 128, 0.1), rgba(107, 114, 128, 0.05))'
    },
    REVOKED: {
        color: '#ef4444',
        icon: '🚫',
        bg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))'
    },
};

interface StatusBadgeProps {
    status: ContractStatus;
    size?: 'sm' | 'md' | 'lg';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
    const config = statusConfig[status];
    const sizes = {
        sm: { padding: '4px 12px', fontSize: '12px' },
        md: { padding: '6px 16px', fontSize: '14px' },
        lg: { padding: '8px 20px', fontSize: '16px' }
    };

    return (
        <div style={{
            padding: sizes[size].padding,
            borderRadius: '9999px',
            fontSize: sizes[size].fontSize,
            fontWeight: 600,
            background: config.bg,
            color: config.color,
            border: `1px solid ${config.color}40`,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backdropFilter: 'blur(4px)',
            animation: 'pulse 2s infinite'
        }}>
            <span>{config.icon}</span>
            <span>{status}</span>
        </div>
    );
}