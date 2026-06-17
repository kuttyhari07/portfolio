import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/contact', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (error) {
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`/api/contact/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Marked as read');
      fetchMessages();
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`/api/contact/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Message deleted');
        fetchMessages();
        setSelectedMessage(null);
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

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
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Contact Messages</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {unreadCount > 0 && (
            <span style={{ background: 'rgba(108, 99, 255, 0.2)', color: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.875rem' }}>
              {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
            </span>
          )}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem' }}>
        {/* Messages List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {messages.length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No messages yet</p>
            </div>
          ) : (
            messages.map((message) => (
              <motion.div
                key={message._id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="glass-card"
                style={{
                  padding: '1rem',
                  cursor: 'pointer',
                  borderLeft: !message.isRead ? `3px solid var(--primary)` : 'none',
                  background: selectedMessage?._id === message._id ? 'rgba(108, 99, 255, 0.1)' : 'var(--card-bg)'
                }}
                onClick={() => setSelectedMessage(message)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontWeight: 'bold' }}>{message.name}</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {new Date(message.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--primary)' }}>{message.subject}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{message.email}</p>
                {!message.isRead && (
                  <span className="badge" style={{ marginTop: '0.5rem', background: 'rgba(108, 99, 255, 0.2)' }}>Unread</span>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          {selectedMessage ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{selectedMessage.name}</h2>
                  <p style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>{selectedMessage.email}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {!selectedMessage.isRead && (
                    <button onClick={() => markAsRead(selectedMessage._id)} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                      Mark as Read
                    </button>
                  )}
                  <button onClick={() => handleDelete(selectedMessage._id)} style={{ padding: '0.5rem 1rem', background: 'rgba(239, 68, 68, 0.2)', border: 'none', borderRadius: '0.5rem', color: '#ef4444', cursor: 'pointer' }}>
                    Delete
                  </button>
                </div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Subject:</h3>
                <p>{selectedMessage.subject}</p>
              </div>
              
              <div>
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Message:</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{selectedMessage.message}</p>
              </div>
              
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Received: {new Date(selectedMessage.createdAt).toLocaleString()}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              <p>Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMessages;