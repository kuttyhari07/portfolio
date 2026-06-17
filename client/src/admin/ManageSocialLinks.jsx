import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ManageSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newLink, setNewLink] = useState({ platform: '', url: '', icon: '', order: 0 });
  const [editingLink, setEditingLink] = useState(null);

  const socialOptions = [
    { value: 'github', label: 'GitHub', icon: '🐙', color: '#6c63ff' },
    { value: 'linkedin', label: 'LinkedIn', icon: '🔗', color: '#0077b5' },
    { value: 'twitter', label: 'Twitter', icon: '🐦', color: '#1da1f2' },
    { value: 'instagram', label: 'Instagram', icon: '📸', color: '#e4405f' },
    { value: 'facebook', label: 'Facebook', icon: '📘', color: '#1877f2' },
    { value: 'youtube', label: 'YouTube', icon: '▶️', color: '#ff0000' },
    { value: 'email', label: 'Email', icon: '📧', color: '#ea4335' },
    { value: 'whatsapp', label: 'WhatsApp', icon: '💬', color: '#25d366' },
  ];

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/social', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSocialLinks(res.data);
    } catch (error) {
      toast.error('Failed to fetch social links');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newLink.platform || !newLink.url) {
      toast.error('Please select a platform and enter a URL');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('/api/social', newLink, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Social link added successfully');
      setNewLink({ platform: '', url: '', icon: '', order: 0 });
      fetchSocialLinks();
    } catch (error) {
      toast.error('Failed to add social link');
    }
  };

  const handleUpdate = async () => {
    if (!editingLink) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`/api/social/${editingLink.platform}`, editingLink, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Social link updated successfully');
      setEditingLink(null);
      fetchSocialLinks();
    } catch (error) {
      toast.error('Failed to update social link');
    }
  };

  const handleDelete = async (platform) => {
    if (window.confirm(`Are you sure you want to delete ${platform}?`)) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`/api/social/${platform}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Social link deleted');
        fetchSocialLinks();
      } catch (error) {
        toast.error('Failed to delete social link');
      }
    }
  };

  const getPlatformDetails = (platform) => {
    return socialOptions.find(opt => opt.value === platform) || { icon: '🔗', color: 'var(--text-muted)' };
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
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Social Links</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your social media presence</p>
      </div>

      {/* Add New Link */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          {editingLink ? 'Edit Social Link' : 'Add New Social Link'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label>Platform</label>
            <select
              value={editingLink ? editingLink.platform : newLink.platform}
              onChange={(e) => {
                const platform = e.target.value;
                const details = getPlatformDetails(platform);
                if (editingLink) {
                  setEditingLink({ ...editingLink, platform, icon: details.icon });
                } else {
                  setNewLink({ ...newLink, platform, icon: details.icon });
                }
              }}
            >
              <option value="">Select Platform</option>
              {socialOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.icon} {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Profile URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={editingLink ? editingLink.url : newLink.url}
              onChange={(e) => {
                if (editingLink) {
                  setEditingLink({ ...editingLink, url: e.target.value });
                } else {
                  setNewLink({ ...newLink, url: e.target.value });
                }
              }}
            />
          </div>
          <button
            onClick={editingLink ? handleUpdate : handleAdd}
            className="btn-primary"
            style={{ marginBottom: '0' }}
          >
            {editingLink ? 'Update Link' : 'Add Link'}
          </button>
        </div>
        {editingLink && (
          <div style={{ marginTop: '0.75rem' }}>
            <button
              onClick={() => setEditingLink(null)}
              style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Cancel Editing
            </button>
          </div>
        )}
      </div>

      {/* Social Links List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {socialLinks.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--text-secondary)' }}>No social links added yet</p>
          </div>
        ) : (
          socialLinks.map((link, index) => {
            const details = getPlatformDetails(link.platform);
            return (
              <motion.div
                key={link.platform}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card"
                style={{ padding: '1.25rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '0.75rem',
                      background: `${details.color}20`,
                      border: `1px solid ${details.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      {details.icon}
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{link.platform}</h3>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--primary)', fontSize: '0.875rem', textDecoration: 'none' }}
                      >
                        {link.url}
                      </a>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={() => setEditingLink(link)}
                      style={{
                        padding: '0.5rem 1rem',
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
                      onClick={() => handleDelete(link.platform)}
                      style={{
                        padding: '0.5rem 1rem',
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
            );
          })
        )}
      </div>
    </div>
  );
};

export default ManageSocialLinks;