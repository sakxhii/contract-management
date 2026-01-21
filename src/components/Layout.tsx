// src/components/Layout.tsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/blueprints', label: 'Blueprints', icon: '📋' },
    { path: '/create-contract', label: 'Create Contract', icon: '📝' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Floating Header */}
      <header style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '95%',
        maxWidth: '1200px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 24px',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 1000,
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: 'white',
              fontWeight: 'bold'
            }}>
              C
            </div>
            <div>
              <h1 style={{ 
                margin: 0, 
                fontSize: '20px', 
                fontWeight: 'bold',
                color: 'var(--gray-900)',
                background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                ContractFlow
              </h1>
              <p style={{ 
                margin: 0, 
                fontSize: '12px', 
                color: 'var(--gray-500)',
                letterSpacing: '0.5px'
              }}>
                Professional Contract Management
              </p>
            </div>
          </div>
          
          <nav style={{ display: 'flex', gap: '8px' }}>
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                style={{
                  textDecoration: 'none',
                  padding: '10px 20px',
                  borderRadius: 'var(--radius)',
                  color: isActive(item.path) ? 'var(--primary-dark)' : 'var(--gray-600)',
                  backgroundColor: isActive(item.path) ? 'var(--primary-light)' : 'transparent',
                  fontWeight: isActive(item.path) ? '600' : '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  border: `1px solid ${isActive(item.path) ? 'var(--primary-light)' : 'transparent'}`
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.backgroundColor = 'var(--gray-100)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ 
        paddingTop: '100px',
        paddingBottom: '40px',
        minHeight: 'calc(100vh - 100px)'
      }}>
        {children}
      </main>

      {/* Floating Action Button for Mobile */}
      <button
        onClick={() => navigate('/create-contract')}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
          color: 'white',
          border: 'none',
          boxShadow: 'var(--shadow-lg)',
          cursor: 'pointer',
          fontSize: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        }}
      >
        📝
      </button>

      {/* Footer */}
      <footer style={{
        padding: '24px',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '14px',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ marginBottom: '8px' }}>
            ContractFlow • Professional Contract Management Platform
          </p>
          <p style={{ 
            fontSize: '12px', 
            opacity: 0.7,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;