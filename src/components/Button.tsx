// src/components/Button.tsx
import React, { useState, useRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success';
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({ 
  children, 
  variant = 'primary', 
  loading = false,
  icon,
  fullWidth = false,
  size = 'md',
  style,
  disabled,
  onClick,
  className,
  ...props 
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  // Handle click with ripple effect
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    // Create ripple effect
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();

      setRipples(prev => [...prev, { x, y, id }]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 600);
    }

    // Call original onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  // Button styles based on variant
  const baseStyle = {
    position: 'relative' as const,
    overflow: 'hidden',
    border: 'none',
    borderRadius: 'var(--radius)',
    cursor: disabled ? 'not-allowed' : loading ? 'wait' : 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontWeight: 600,
    lineHeight: 1,
    fontFamily: 'inherit',
    outline: 'none',
    width: fullWidth ? '100%' : 'auto',
  };

  // Size styles
  const sizeStyles = {
    sm: {
      padding: '8px 16px',
      fontSize: '13px',
      minHeight: '32px',
    },
    md: {
      padding: '12px 24px',
      fontSize: '14px',
      minHeight: '40px',
    },
    lg: {
      padding: '16px 32px',
      fontSize: '16px',
      minHeight: '48px',
    },
  };

  // Variant styles
  const variantStyles = {
    primary: {
      background: disabled 
        ? 'var(--gray-300)' 
        : isPressed 
        ? 'var(--primary-dark)'
        : 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
      color: 'white',
      boxShadow: disabled 
        ? 'none' 
        : isHovered 
        ? '0 10px 25px rgba(79, 70, 229, 0.3), 0 0 0 1px rgba(79, 70, 229, 0.1)'
        : '0 4px 12px rgba(79, 70, 229, 0.15), 0 0 0 1px rgba(79, 70, 229, 0.1)',
      transform: disabled 
        ? 'none' 
        : isPressed 
        ? 'translateY(2px) scale(0.98)'
        : isHovered 
        ? 'translateY(-2px)' 
        : 'none',
    },
    secondary: {
      background: disabled 
        ? 'var(--gray-200)' 
        : isPressed 
        ? 'var(--secondary-dark)'
        : 'linear-gradient(135deg, var(--secondary), var(--secondary-dark))',
      color: 'white',
      boxShadow: disabled 
        ? 'none' 
        : isHovered 
        ? '0 10px 25px rgba(16, 185, 129, 0.3), 0 0 0 1px rgba(16, 185, 129, 0.1)'
        : '0 4px 12px rgba(16, 185, 129, 0.15), 0 0 0 1px rgba(16, 185, 129, 0.1)',
      transform: disabled 
        ? 'none' 
        : isPressed 
        ? 'translateY(2px) scale(0.98)'
        : isHovered 
        ? 'translateY(-2px)' 
        : 'none',
    },
    danger: {
      background: disabled 
        ? 'var(--gray-200)' 
        : isPressed 
        ? '#dc2626'
        : 'linear-gradient(135deg, var(--danger), #dc2626)',
      color: 'white',
      boxShadow: disabled 
        ? 'none' 
        : isHovered 
        ? '0 10px 25px rgba(239, 68, 68, 0.3), 0 0 0 1px rgba(239, 68, 68, 0.1)'
        : '0 4px 12px rgba(239, 68, 68, 0.15), 0 0 0 1px rgba(239, 68, 68, 0.1)',
      transform: disabled 
        ? 'none' 
        : isPressed 
        ? 'translateY(2px) scale(0.98)'
        : isHovered 
        ? 'translateY(-2px)' 
        : 'none',
    },
    success: {
      background: disabled 
        ? 'var(--gray-200)' 
        : isPressed 
        ? '#059669'
        : 'linear-gradient(135deg, #10b981, #059669)',
      color: 'white',
      boxShadow: disabled 
        ? 'none' 
        : isHovered 
        ? '0 10px 25px rgba(16, 185, 129, 0.3), 0 0 0 1px rgba(16, 185, 129, 0.1)'
        : '0 4px 12px rgba(16, 185, 129, 0.15), 0 0 0 1px rgba(16, 185, 129, 0.1)',
      transform: disabled 
        ? 'none' 
        : isPressed 
        ? 'translateY(2px) scale(0.98)'
        : isHovered 
        ? 'translateY(-2px)' 
        : 'none',
    },
    ghost: {
      background: disabled 
        ? 'transparent' 
        : isPressed 
        ? 'var(--gray-200)'
        : 'transparent',
      color: disabled 
        ? 'var(--gray-400)' 
        : 'var(--gray-700)',
      border: `1px solid ${disabled ? 'var(--gray-300)' : 'var(--gray-300)'}`,
      boxShadow: disabled 
        ? 'none' 
        : isHovered 
        ? '0 4px 12px rgba(0, 0, 0, 0.05)'
        : 'none',
      transform: disabled 
        ? 'none' 
        : isPressed 
        ? 'translateY(2px) scale(0.98)'
        : isHovered 
        ? 'translateY(-2px)' 
        : 'none',
    },
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={() => !disabled && !loading && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => !disabled && !loading && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsPressed(true);
        }
      }}
      onKeyUp={() => setIsPressed(false)}
      disabled={disabled || loading}
      style={{
        ...baseStyle,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      className={className}
      {...props}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            transform: 'scale(0)',
            animation: 'ripple 0.6s linear',
            width: '100px',
            height: '100px',
            top: ripple.y - 50,
            left: ripple.x - 50,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Loading spinner */}
      {loading ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <div style={{
            width: '16px',
            height: '16px',
            border: `2px solid rgba(255, 255, 255, 0.3)`,
            borderTopColor: 'white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <span>Loading...</span>
        </div>
      ) : (
        <>
          {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
          <span>{children}</span>
        </>
      )}

      {/* Add CSS animations */}
      <style>
        {`
          @keyframes ripple {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </button>
  );
}