// src/components/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Card({ children, style }: CardProps) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      padding: '24px',
      margin: '16px 0',
      ...style
    }}>
      {children}
    </div>
  );
}