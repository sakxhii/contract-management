// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BlueprintProvider } from './context/BlueprintContext';
import { ContractProvider } from './context/ContractContext';
import Layout from './components/Layout';
import BlueprintsPage from './pages/BlueprintsPage';
import CreateContractPage from './pages/CreateContractPage';
import ContractsDashboard from './pages/ContractsDashboard';
import Button from './components/Button';
import Card from './components/Card';
import StatsCard from './components/StatsCard';
import StatusBadge from './components/StatusBadge';
import type { ContractStatus } from './types/contract';
import './App.css';

// Loading screen component
function LoadingScreen() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        border: '4px solid rgba(255, 255, 255, 0.3)',
        borderTopColor: 'white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '20px'
      }} />
      <h1 style={{ 
        color: 'white', 
        marginBottom: '10px',
        fontSize: '28px',
        fontWeight: 'bold'
      }}>
        ContractFlow
      </h1>
      <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
        Loading your workspace...
      </p>
    </div>
  );
}

// Home page component
function HomePage() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '60px',
        padding: '60px 20px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Streamline Your Contract Management
        </h1>
        <p style={{
          fontSize: '20px',
          color: 'var(--gray-600)',
          maxWidth: '600px',
          margin: '0 auto 30px',
          lineHeight: 1.6
        }}>
          Create, track, and manage contracts with our modern, intuitive platform.
          Built for speed, designed for efficiency.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button 
            variant="primary" 
            size="lg"
            icon="🚀"
            onClick={() => window.location.href = '/create-contract'}
            style={{
              transform: isHovered ? 'translateY(-4px)' : 'none',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Get Started
          </Button>
          <Button 
            variant="ghost" 
            size="lg"
            icon="📚"
            onClick={() => window.location.href = '/blueprints'}
          >
            View Templates
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '40px',
          color: 'var(--gray-900)'
        }}>
          Why Choose ContractFlow?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          <Card hoverable style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              margin: '0 auto 20px'
            }}>
              📋
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--gray-900)' }}>
              Template Library
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.6 }}>
              Create reusable contract templates with customizable fields and layouts.
            </p>
          </Card>

          <Card hoverable style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #f093fb, #f5576c)',
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              margin: '0 auto 20px'
            }}>
              📊
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--gray-900)' }}>
              Smart Dashboard
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.6 }}>
              Track contract status, deadlines, and progress in real-time.
            </p>
          </Card>

          <Card hoverable style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              margin: '0 auto 20px'
            }}>
              🔒
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--gray-900)' }}>
              Secure & Reliable
            </h3>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.6 }}>
              Your data is securely stored and accessible across all your devices.
            </p>
          </Card>
        </div>
      </div>

      {/* Contract Lifecycle Demo */}
      <Card 
        title="Contract Lifecycle" 
        subtitle="Track every stage of your contracts"
        gradient
      >
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
          marginTop: '20px'
        }}>
          {(['CREATED', 'APPROVED', 'SENT', 'SIGNED', 'LOCKED', 'REVOKED'] as ContractStatus[]).map((status) => (
            <div key={status} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
              <StatusBadge status={status} size="lg" />
              <div style={{
                width: '24px',
                height: '2px',
                background: 'var(--gray-300)',
                margin: '8px 0'
              }} />
            </div>
          ))}
        </div>
        <p style={{
          textAlign: 'center',
          color: 'var(--gray-600)',
          marginTop: '20px',
          fontSize: '14px'
        }}>
          Each contract follows a controlled lifecycle with clear state transitions
        </p>
      </Card>
    </div>
  );
}

// 404 Page
function NotFoundPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '40px 20px'
    }}>
      <div style={{
        fontSize: '120px',
        fontWeight: 'bold',
        background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '20px'
      }}>
        404
      </div>
      <h1 style={{ fontSize: '32px', marginBottom: '16px', color: 'var(--gray-900)' }}>
        Page Not Found
      </h1>
      <p style={{ fontSize: '18px', color: 'var(--gray-600)', marginBottom: '32px', maxWidth: '500px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button 
        variant="primary" 
        size="lg"
        icon="🏠"
        onClick={() => window.location.href = '/'}
      >
        Back to Home
      </Button>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <BlueprintProvider>
        <ContractProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blueprints" element={<BlueprintsPage />} />
              <Route path="/create-contract" element={<CreateContractPage />} />
              <Route path="/dashboard" element={<ContractsDashboard />} />
              <Route path="/contracts" element={<Navigate to="/dashboard" replace />} />
              <Route path="/templates" element={<Navigate to="/blueprints" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </ContractProvider>
      </BlueprintProvider>
    </Router>
  );
}

export default App;