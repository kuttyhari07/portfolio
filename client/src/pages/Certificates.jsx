import React, { useState, useEffect } from 'react';
import API from '../services/api';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await API.get('/certificates');
        const data = res.data?.data || res.data?.certificates || res.data || [];
        setCertificates(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  if (loading) return <Loader />;

  return (
    <section style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title">My <span>Certificates</span></h1>
          <p className="section-subtitle">Professional certifications and achievements</p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}
        >
          <div className="glass-card" style={{ padding: '1rem 2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
              {certificates.length}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total Certificates</div>
          </div>
          <div className="glass-card" style={{ padding: '1rem 2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent)' }}>
              {certificates.filter(c => c.credentialUrl).length}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Verified</div>
          </div>
        </motion.div>

        {/* Certificates Grid */}
        {certificates.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>No certificates added yet</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {certificates.map((cert, index) => (
              <motion.div
                key={cert._id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-card"
                style={{ cursor: cert.credentialUrl ? 'pointer' : 'default' }}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => {
                  if (cert.credentialUrl) {
                    window.open(cert.credentialUrl, '_blank');
                  } else {
                    setSelectedCert(cert);
                  }
                }}
              >
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img
                    src={cert.image}
                    alt={cert.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  {cert.credentialUrl && (
                    <span style={{
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1rem',
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(16, 185, 129, 0.9)',
                      borderRadius: '2rem',
                      fontSize: '0.65rem',
                      fontWeight: 'bold',
                      color: 'white'
                    }}>
                      ✅ Verified
                    </span>
                  )}
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    {cert.title}
                  </h3>
                  <p style={{ color: 'var(--primary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    {cert.issuedBy}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      📅 {new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    {cert.credentialUrl && (
                      <span style={{ color: 'var(--secondary)', fontSize: '0.75rem' }}>
                        🔗 View Credential →
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Certificate Detail Modal */}
      {selectedCert && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setSelectedCert(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card"
            style={{ maxWidth: '600px', width: '100%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative' }}>
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '1.5rem 1.5rem 0 0' }}
              />
              <button
                onClick={() => setSelectedCert(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.25rem',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                {selectedCert.title}
              </h2>
              <p style={{ color: 'var(--primary)', fontSize: '1rem', marginBottom: '0.5rem' }}>
                {selectedCert.issuedBy}
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Issued: {new Date(selectedCert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              {selectedCert.credentialUrl && (
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  🔗 View Credential
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Certificates;