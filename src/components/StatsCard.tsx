// src/components/StatsCard.tsx
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: string;
}

export default function StatsCard({ title, value, icon, color, trend }: StatsCardProps) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: 'var(--shadow)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ 
            margin: 0, 
            fontSize: '14px', 
            color: 'var(--gray-500)',
            marginBottom: '8px'
          }}>
            {title}
          </p>
          <p style={{ 
            margin: 0, 
            fontSize: '24px', 
            fontWeight: 'bold',
            color: 'var(--gray-900)'
          }}>
            {value}
          </p>
          {trend && (
            <p style={{ 
              margin: '4px 0 0 0', 
              fontSize: '12px', 
              color: trend.startsWith('+') ? 'var(--success)' : 'var(--danger)'
            }}>
              {trend}
            </p>
          )}
        </div>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius)',
          background: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
}