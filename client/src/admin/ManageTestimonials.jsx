import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import API from '../services/api';
const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await API.get('/testimonials');
      setTestimonials(res.data);
    } catch (error) {
      toast.error('Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      await API.put(`/testimonials/${id}/status`, { status });
      toast.success(`Review ${status}`);
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this review?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await API.delete(`/testimonials/${id}`);
        toast.success('Review deleted');
        fetchTestimonials();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return { bg: 'rgba(16, 185, 129, 0.2)', color: '#10b981' };
      case 'pending': return { bg: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' };
      case 'rejected': return { bg: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' };
      default: return { bg: 'rgba(107, 114, 128, 0.2)', color: '#6b7280' };
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  const pendingCount = testimonials.filter(t => t.status === 'pending').length;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Manage Testimonials</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {pendingCount > 0 && (
            <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.875rem' }}>
              {pendingCount} pending review{pendingCount !== 1 ? 's' : ''}
            </span>
          )}
        </p>
      </div>

      {/* Testimonials List */}
      {testimonials.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No testimonials yet</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {testimonials.map((testimonial, index) => {
            const statusStyle = getStatusColor(testimonial.status);
            return (
              <motion.div
                key={testimonial._id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card"
                style={{ padding: '1.5rem' }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'var(--gradient-1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        fontWeight: 'bold'
                      }}>
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{testimonial.name}</h3>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          {[...Array(5)].map((_, i) => (
                            <span key={i} style={{ color: i < testimonial.rating ? '#fbbf24' : 'var(--text-muted)' }}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>"{testimonial.review}"</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      {new Date(testimonial.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '2rem',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      background: statusStyle.bg,
                      color: statusStyle.color
                    }}>
                      {testimonial.status}
                    </span>
                    
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {testimonial.status !== 'approved' && (
                        <button
                          onClick={() => updateStatus(testimonial._id, 'approved')}
                          style={{
                            padding: '0.5rem 1rem',
                            background: 'rgba(16, 185, 129, 0.2)',
                            border: 'none',
                            borderRadius: '0.5rem',
                            color: '#10b981',
                            cursor: 'pointer'
                          }}
                        >
                          ✓ Approve
                        </button>
                      )}
                      {testimonial.status !== 'rejected' && (
                        <button
                          onClick={() => updateStatus(testimonial._id, 'rejected')}
                          style={{
                            padding: '0.5rem 1rem',
                            background: 'rgba(239, 68, 68, 0.2)',
                            border: 'none',
                            borderRadius: '0.5rem',
                            color: '#ef4444',
                            cursor: 'pointer'
                          }}
                        >
                          ✗ Reject
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(testimonial._id)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: 'rgba(107, 114, 128, 0.2)',
                          border: 'none',
                          borderRadius: '0.5rem',
                          color: 'var(--text-muted)',
                          cursor: 'pointer'
                        }}
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManageTestimonials;