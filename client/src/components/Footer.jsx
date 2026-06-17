import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'rgba(7, 11, 26, 0.95)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '0.75rem 0',
      marginTop: '2rem'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
            © {currentYear} Hari Haran
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>•</span>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.7rem' }}>
            Home
          </Link>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>•</span>
          <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.7rem' }}>
            About
          </Link>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>•</span>
          <Link to="/contact" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.7rem' }}>
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;