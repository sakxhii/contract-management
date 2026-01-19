// src/components/Input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
}

export default function Input({ label, error, icon, style, ...props }: InputProps) {
  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <label style={{
          display: 'block',
          marginBottom: '6px',
          fontSize: '14px',
          fontWeight: '500',
          color: 'var(--gray-700)'
        }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <div style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '18px'
          }}>
            {icon}
          </div>
        )}
        <input
          {...props}
          style={{
            width: '100%',
            padding: icon ? '12px 12px 12px 40px' : '12px',
            border: `1px solid ${error ? 'var(--danger)' : 'var(--gray-300)'}`,
            borderRadius: 'var(--radius)',
            fontSize: '14px',
            color: 'var(--gray-800)',
            backgroundColor: 'white',
            transition: 'all 0.2s ease',
            ...style
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--primary)';
            e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? 'var(--danger)' : 'var(--gray-300)';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>
      {error && (
        <p style={{
          margin: '4px 0 0 0',
          fontSize: '12px',
          color: 'var(--danger)'
        }}>
          {error}
        </p>
      )}
    </div>
  );
}