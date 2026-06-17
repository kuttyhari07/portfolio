import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'About', path: '/about', icon: '👤' },
    { name: 'Skills', path: '/skills', icon: '💻' },
    { name: 'Projects', path: '/projects', icon: '🚀' },
    { name: 'Certificates', path: '/certificates', icon: '📜' },
    { name: 'Testimonials', path: '/testimonials', icon: '⭐' },
    { name: 'Contact', path: '/contact', icon: '📧' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Set active link
    setActiveLink(location.pathname);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container">
          <div className="nav-container">
            {/* Logo */}
            <Link to="/" className="logo">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="logo-wrapper"
              >
                <div className="logo-icon">HK</div>
                <div className="logo-text">
                  <span className="logo-name">Hariharan G</span>
                  <span className="logo-subtitle">IT Student</span>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="nav-links-desktop">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link ${activeLink === link.path ? 'active' : ''}`}
                >
                  <span className="nav-icon">{link.icon}</span>
                  <span className="nav-label">{link.name}</span>
                  {activeLink === link.path && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="nav-indicator"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Right Side - CTA Button */}
            <div className="nav-actions">
              <Link to="/contact" className="nav-cta">
                <span>Hire Me</span>
                <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <button
                className="mobile-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                <span className={`hamburger ${isOpen ? 'active' : ''}`}>
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="nav-mobile"
              >
                <div className="nav-mobile-links">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className={`mobile-link ${activeLink === link.path ? 'active' : ''}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="mobile-link-icon">{link.icon}</span>
                        <span className="mobile-link-text">{link.name}</span>
                        {activeLink === link.path && (
                          <span className="mobile-link-check">✓</span>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="nav-mobile-footer">
                  <Link to="/contact" className="mobile-cta" onClick={() => setIsOpen(false)}>
                    📩 Get in Touch
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1rem 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .navbar-scrolled {
          background: rgba(7, 11, 26, 0.92);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
          padding: 0.5rem 0;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }

        /* Logo */
        .logo {
          text-decoration: none;
          flex-shrink: 0;
        }

        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-icon {
          width: 42px;
          height: 42px;
          background: var(--gradient-1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1rem;
          color: white;
          box-shadow: 0 4px 15px rgba(108, 99, 255, 0.3);
          transition: all 0.3s ease;
        }

        .logo:hover .logo-icon {
          transform: rotate(-10deg) scale(1.05);
          box-shadow: 0 4px 25px rgba(108, 99, 255, 0.5);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .logo-name {
          font-size: 1.1rem;
          font-weight: 700;
          background: var(--gradient-1);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .logo-subtitle {
          font-size: 0.6rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* Desktop Navigation Links */
        .nav-links-desktop {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1rem;
          border-radius: 10px;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.06);
        }

        .nav-link.active {
          color: white;
          background: rgba(108, 99, 255, 0.15);
        }

        .nav-icon {
          font-size: 1rem;
        }

        .nav-indicator {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: var(--gradient-1);
          border-radius: 2px;
        }

        /* CTA Button */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .nav-cta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.25rem;
          background: var(--gradient-1);
          border-radius: 10px;
          color: white;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(108, 99, 255, 0.3);
        }

        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(108, 99, 255, 0.4);
        }

        .cta-arrow {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease;
        }

        .nav-cta:hover .cta-arrow {
          transform: translateX(4px);
        }

        /* Mobile Toggle */
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: background 0.3s ease;
        }

        .mobile-toggle:hover {
          background: rgba(255, 255, 255, 0.06);
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 24px;
          height: 20px;
        }

        .bar {
          display: block;
          width: 100%;
          height: 2px;
          background: white;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .hamburger.active .bar:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .hamburger.active .bar:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active .bar:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile Navigation */
        .nav-mobile {
          background: rgba(7, 11, 26, 0.98);
          backdrop-filter: blur(16px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          margin-top: 1rem;
          padding: 1rem;
          overflow: hidden;
        }

        .nav-mobile-links {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .mobile-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .mobile-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.06);
        }

        .mobile-link.active {
          color: white;
          background: rgba(108, 99, 255, 0.15);
        }

        .mobile-link-icon {
          font-size: 1.1rem;
        }

        .mobile-link-check {
          margin-left: auto;
          color: var(--primary);
        }

        .nav-mobile-footer {
          margin-top: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .mobile-cta {
          display: block;
          text-align: center;
          padding: 0.75rem;
          background: var(--gradient-1);
          border-radius: 10px;
          color: white;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .mobile-cta:hover {
          opacity: 0.9;
          transform: scale(1.02);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .nav-links-desktop {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
          .nav-actions {
            gap: 0.5rem;
          }
          .nav-cta span {
            display: none;
          }
          .nav-cta {
            padding: 0.5rem;
            border-radius: 10px;
          }
          .cta-arrow {
            width: 20px;
            height: 20px;
          }
        }

        @media (max-width: 768px) {
          .logo-subtitle {
            display: none;
          }
          .logo-name {
            font-size: 0.95rem;
          }
          .logo-icon {
            width: 36px;
            height: 36px;
            font-size: 0.85rem;
          }
        }

        @media (min-width: 1025px) {
          .nav-cta span {
            display: inline;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;