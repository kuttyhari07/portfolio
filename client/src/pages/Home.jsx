import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import API from '../services/api';

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [stats, setStats] = useState({ totalReviews: 0, averageRating: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeRes, socialRes, statsRes] = await Promise.all([
          API.get('/home'),
          API.get('/social'),
          API.get('/testimonials/stats'),
        ]);

        setHomeData(homeRes.data);
        setSocialLinks(socialRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;

  const socialIcons = {
    github: '🐙',
    linkedin: '🔗',
    twitter: '🐦',
    email: '📧',
    instagram: '📸',
    facebook: '📘',
  };

  return (
    <div>
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: '5rem',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at 10% 30%, rgba(108, 99, 255, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 90% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.05) 0%, transparent 70%)
            `,
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(108, 99, 255, 0.1), transparent 70%)',
            borderRadius: '50%',
            animation: 'float 8s ease-in-out infinite',
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '5%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08), transparent 70%)',
            borderRadius: '50%',
            animation: 'float 10s ease-in-out infinite reverse',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4rem',
              alignItems: 'center',
            }}
          >
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1.25rem',
                  background: 'rgba(108, 99, 255, 0.15)',
                  borderRadius: '2rem',
                  border: '1px solid rgba(108, 99, 255, 0.2)',
                  marginBottom: '1.5rem',
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>👋</span>
                <span style={{ color: 'var(--primary)', fontWeight: 500 }}>
                  Welcome to my portfolio
                </span>
              </motion.div>

              <h1
                style={{
                  fontSize: '4rem',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginBottom: '1rem',
                }}
              >
                Hi, I'm <br />
                <span className="text-gradient" style={{ fontSize: '4.5rem' }}>
                  {homeData?.name || 'Hari Haran'}
                </span>
              </h1>

              <div
                style={{
                  fontSize: '1.5rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>I'm a</span>
                <TypeAnimation
                  sequence={
                    homeData?.typingTexts?.flatMap((text) => [text, 2000]) || [
                      'IT Student 💻',
                      2000,
                      'Full Stack Developer 🚀',
                      2000,
                      'Problem Solver 🧩',
                      2000,
                      'Tech Enthusiast 🌟',
                      2000,
                    ]
                  }
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  style={{ color: 'var(--primary)', fontWeight: 600 }}
                />
              </div>

              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1.125rem',
                  maxWidth: '500px',
                  lineHeight: 1.8,
                  marginBottom: '2rem',
                }}
              >
                {homeData?.introText ||
                  'Passionate about building innovative solutions that make a difference.'}
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  marginBottom: '2.5rem',
                }}
              >
                <motion.a
                  href="/resume.pdf"
                  download="Hariharan_Resume.pdf"
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  📄 Download Resume
                </motion.a>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/contact" className="btn-secondary">
                    💼 Hire Me
                  </Link>
                </motion.div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem' }}>
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      transition: 'all 0.3s ease',
                    }}
                    whileHover={{
                      y: -5,
                      background: 'var(--primary)',
                      borderColor: 'var(--primary)',
                      boxShadow: 'var(--shadow-glow)',
                    }}
                  >
                    {socialIcons[link.platform] || '🔗'}
                  </motion.a>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="glass-card"
                  style={{ padding: '1rem 1.5rem', textAlign: 'center', minWidth: '120px' }}
                >
                  <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    <span className="text-gradient">{stats.averageRating || 0}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    ⭐ Average Rating
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="glass-card"
                  style={{ padding: '1rem 1.5rem', textAlign: 'center', minWidth: '120px' }}
                >
                  <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    <span className="text-gradient">{stats.totalReviews || 0}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    📝 Total Reviews
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 80, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '450px',
                  height: '450px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(108, 99, 255, 0.2), transparent 70%)',
                  animation: 'float 6s ease-in-out infinite',
                }}
              />

              <div
                style={{
                  position: 'relative',
                  width: '400px',
                  height: '400px',
                  borderRadius: '50%',
                  padding: '4px',
                  background: 'var(--gradient-1)',
                  animation: 'float 6s ease-in-out infinite',
                  boxShadow: 'var(--shadow-glow)',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    background: 'var(--bg-primary)',
                  }}
                >
                  {homeData?.profilePhoto ? (
                    <img
                      src={homeData.profilePhoto}
                      alt={homeData.name || 'Profile'}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '6rem',
                        fontWeight: 'bold',
                        background: 'var(--gradient-1)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      HH
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          [style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          h1 {
            font-size: 2.5rem !important;
          }
          h1 span {
            font-size: 2.8rem !important;
          }
          [style*="width: 400px"] {
            width: 280px !important;
            height: 280px !important;
          }
          [style*="width: 450px"] {
            width: 320px !important;
            height: 320px !important;
          }
        }
        @media (max-width: 768px) {
          h1 {
            font-size: 2rem !important;
          }
          h1 span {
            font-size: 2.2rem !important;
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default Home;