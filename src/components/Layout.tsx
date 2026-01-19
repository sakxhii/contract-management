// src/components/Layout.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <nav style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 20px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 style={{ 
              margin: 0, 
              fontSize: '20px', 
              fontWeight: 'bold',
              color: '#111827'
            }}>
              Contract Platform
            </h1>
            <span style={{
              fontSize: '12px',
              backgroundColor: '#e5e7eb',
              padding: '2px 6px',
              borderRadius: '4px',
              color: '#6b7280'
            }}>
              Demo
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link 
              to="/blueprints" 
              style={{
                textDecoration: 'none',
                color: isActive('/blueprints') ? '#111827' : '#6b7280',
                fontWeight: isActive('/blueprints') ? '600' : '400',
                padding: '8px 0',
                borderBottom: isActive('/blueprints') ? '2px solid #111827' : 'none'
              }}
            >
              Blueprints
            </Link>
            <Link 
              to="/create-contract" 
              style={{
                textDecoration: 'none',
                color: isActive('/create-contract') ? '#111827' : '#6b7280',
                fontWeight: isActive('/create-contract') ? '600' : '400',
                padding: '8px 0',
                borderBottom: isActive('/create-contract') ? '2px solid #111827' : 'none'
              }}
            >
              Create Contract
            </Link>
            <Link 
              to="/dashboard" 
              style={{
                textDecoration: 'none',
                color: isActive('/dashboard') ? '#111827' : '#6b7280',
                fontWeight: isActive('/dashboard') ? '600' : '400',
                padding: '8px 0',
                borderBottom: isActive('/dashboard') ? '2px solid #111827' : 'none'
              }}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {children}
      </main>

      <footer style={{
        marginTop: '40px',
        padding: '20px',
        textAlign: 'center',
        color: '#6b7280',
        fontSize: '14px',
        borderTop: '1px solid #e5e7eb'
      }}>
        Contract Management Platform • Built with React & TypeScript
      </footer>
    </div>
  );
};

export default Layout;