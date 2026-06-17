import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Projects', path: '/admin/projects', icon: '🚀' },
    { name: 'Skills', path: '/admin/skills', icon: '💻' },
    { name: 'Certificates', path: '/admin/certificates', icon: '📜' },
    { name: 'Testimonials', path: '/admin/testimonials', icon: '⭐' },
    { name: 'Messages', path: '/admin/messages', icon: '✉️' },
    { name: 'Social Links', path: '/admin/social', icon: '🔗' },
    { name: 'Content', path: '/admin/content', icon: '📝' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const getPageTitle = () => {
    const current = menuItems.find(item => item.path === location.pathname);
    return current ? current.name : 'Dashboard';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '280px',
        background: 'rgba(7, 11, 26, 0.98)',
        backdropFilter: 'blur(10px)',
        borderRight: '1px solid var(--border)',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 1000,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Logo */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--border)',
          background: 'rgba(108, 99, 255, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'var(--gradient-1)',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem'
            }}>
              🚀
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                <span className="text-gradient">Admin</span>
              </h2>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '-0.2rem' }}>Portfolio Manager</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav style={{ padding: '1rem', flex: 1 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  marginBottom: '0.5rem',
                  borderRadius: '0.75rem',
                  background: isActive ? 'var(--gradient-1)' : 'transparent',
                  color: isActive ? 'white' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                <span style={{ fontWeight: 500 }}>{item.name}</span>
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    right: '1rem',
                    width: '6px',
                    height: '6px',
                    background: 'white',
                    borderRadius: '50%',
                    opacity: 0.6
                  }} />
                )}
              </Link>
            );
          })}
        </nav>
        
        {/* Footer - Logout */}
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              background: 'transparent',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: 'var(--error)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '0.875rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>🚪</span>
            <span style={{ fontWeight: 500 }}>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Mobile Header */}
      <div style={{
        display: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        padding: '1rem',
        background: 'rgba(7, 11, 26, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)'
      }} className="mobile-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              padding: '0.5rem',
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1.25rem'
            }}
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>
          <span style={{ fontWeight: 'bold' }}>{getPageTitle()}</span>
          <div style={{ width: '40px' }} />
        </div>
      </div>
      
      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            zIndex: 999,
            display: 'none'
          }}
          className="mobile-overlay"
        />
      )}
      
      {/* Main Content */}
      <div style={{ marginLeft: '280px', padding: '2rem' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
      
      <style>{`
        @media (max-width: 1024px) {
          .mobile-header {
            display: block !important;
          }
          .mobile-overlay {
            display: block !important;
          }
          [style*="margin-left: 280px"] {
            margin-left: 0 !important;
            padding: 1rem !important;
            padding-top: 4.5rem !important;
          }
        }
        @media (max-width: 768px) {
          [style*="padding: 2rem"] {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;