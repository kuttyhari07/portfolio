import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../services/api';
const ManageCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    issuedBy: '',
    image: '',
    issueDate: '',
    credentialUrl: '',
  });

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await API.get('/certificates');
      setCertificates(res.data);
    } catch (error) {
      toast.error('Failed to fetch certificates');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', 'certificates');

    try {
      const token = localStorage.getItem('adminToken');
      const res = await API.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFormData(prev => ({ ...prev, image: res.data.url }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error('Please upload a certificate image');
      return;
    }
    try {
      const token = localStorage.getItem('adminToken');
      if (editingCert) {
        await API.put(`/certificates/${editingCert._id}`, formData);
        toast.success('Certificate updated successfully');
      } else {
        await API.post('/certificates', formData);
        toast.success('Certificate added successfully');
      }
      fetchCertificates();
      closeModal();
    } catch (error) {
      toast.error('Failed to save certificate');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await API.delete(`/certificates/${id}`);
        toast.success('Certificate deleted');
        fetchCertificates();
      } catch (error) {
        toast.error('Failed to delete certificate');
      }
    }
  };

  const openModal = (cert = null) => {
    if (cert) {
      setEditingCert(cert);
      setFormData({
        ...cert,
        issueDate: cert.issueDate?.split('T')[0] || '',
      });
    } else {
      setEditingCert(null);
      setFormData({
        title: '',
        issuedBy: '',
        image: '',
        issueDate: '',
        credentialUrl: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCert(null);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Manage Certificates</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Add, edit, or remove your professional certificates</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary">
          + Add Certificate
        </button>
      </div>

      {/* Certificates Grid */}
      {certificates.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>No certificates added yet</p>
          <button onClick={() => openModal()} className="btn-primary">Add Your First Certificate</button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {certificates.map((cert, index) => (
            <motion.div
              key={cert._id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card"
            >
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                  src={cert.image}
                  alt={cert.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                    fontWeight: 'bold'
                  }}>
                    🔗 Verified
                  </span>
                )}
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{cert.title}</h3>
                <p style={{ color: 'var(--primary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{cert.issuedBy}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                  📅 {new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                  <button
                    onClick={() => openModal(cert)}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      background: 'rgba(108, 99, 255, 0.2)',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: 'var(--primary)',
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cert._id)}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: 'var(--error)',
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              overflowY: 'auto'
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="glass-card"
              style={{ maxWidth: '520px', width: '100%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {editingCert ? 'Edit Certificate' : 'Add New Certificate'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                  {editingCert ? 'Update the certificate details below' : 'Enter the certificate details below'}
                </p>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label>Certificate Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Full Stack Web Development"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <label>Issued By</label>
                    <input
                      type="text"
                      placeholder="e.g., Coursera, Google, Microsoft"
                      value={formData.issuedBy}
                      onChange={(e) => setFormData({ ...formData, issuedBy: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <label>Issue Date</label>
                    <input
                      type="date"
                      value={formData.issueDate}
                      onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <label>Certificate Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ padding: '0.5rem' }}
                    />
                    {uploading && (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                        ⏳ Uploading...
                      </p>
                    )}
                    {formData.image && !uploading && (
                      <div style={{ marginTop: '0.75rem' }}>
                        <img
                          src={formData.image}
                          alt="Preview"
                          style={{ height: '100px', borderRadius: '0.5rem', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label>Credential URL (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://www.coursera.org/verify/..."
                      value={formData.credentialUrl}
                      onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                    />
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Add a link to verify this certificate online
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                      {editingCert ? 'Update Certificate' : 'Add Certificate'}
                    </button>
                    <button type="button" onClick={closeModal} className="btn-secondary" style={{ flex: 1 }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageCertificates;