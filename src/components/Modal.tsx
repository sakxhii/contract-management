// First, create a Modal component
// src/components/Modal.tsx
import React, { useEffect } from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl'
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 9998,
          animation: 'fadeIn 0.3s ease-out'
        }}
      />
      
      {/* Modal */}
      <div
        className="modal-content"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: size === 'sm' ? '400px' : size === 'lg' ? '800px' : '600px',
          backgroundColor: 'white',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          zIndex: 9999,
          animation: 'slideIn 0.3s ease-out',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid var(--gray-200)',
          backgroundColor: 'var(--gray-50)'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'var(--gray-900)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span>📄</span>
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              color: 'var(--gray-400)',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              lineHeight: 1
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--gray-700)';
              e.currentTarget.style.backgroundColor = 'var(--gray-100)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--gray-400)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div style={{
          padding: '24px',
          maxHeight: '70vh',
          overflowY: 'auto'
        }}>
          {children}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--gray-200)',
          backgroundColor: 'var(--gray-50)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px'
        }}>
          <Button
            onClick={onClose}
            variant="ghost"
          >
            Close
          </Button>
        </div>
      </div>
    </>
  );
}