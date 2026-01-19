// src/components/Card.tsx
import React, { useState } from 'react';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  title?: string;
  subtitle?: string;
  gradient?: boolean;
  hoverable?: boolean;
}

export default function Card({ 
  children, 
  style, 
  title, 
  subtitle, 
  gradient = false,
  hoverable = false 
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => hoverable && setIsHovered(true)}
      onMouseLeave={() => hoverable && setIsHovered(false)}
      style={{
        background: gradient 
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))'
          : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        padding: '28px',
        margin: '16px 0',
        boxShadow: isHovered && hoverable
          ? '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2)'
          : '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered && hoverable ? 'translateY(-4px)' : 'translateY(0)',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Decorative background element */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle at 30% 30%, rgba(79, 70, 229, 0.05), transparent 70%)',
        zIndex: 0,
        opacity: isHovered && hoverable ? 1 : 0.5,
        transition: 'opacity 0.3s ease'
      }} />
      
      {title && (
        <div style={{ position: 'relative', zIndex: 1, marginBottom: subtitle ? '8px' : '20px' }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '24px', 
            fontWeight: 'bold',
            color: 'var(--gray-900)',
            background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ 
              margin: 0, 
              fontSize: '14px', 
              color: 'var(--gray-500)',
              marginTop: '4px'
            }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}