import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import API from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    certificates: 0,
    messages: 0,
    testimonials: 0,
    averageRating: 0,
  });

  const [loading, setLoading] = useState(true);
  const [adminInfo, setAdminInfo] = useState(null);
  const [recentMessages, setRecentMessages] = useState([]);
  const [pendingTestimonials, setPendingTestimonials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const admin = JSON.parse(localStorage.getItem('adminInfo') || '{}');
        setAdminInfo(admin);

        const [
          projects,
          skills,
          certificates,
          messages,
          testimonials,
          statsRes,
        ] = await Promise.all([
          API.get('/projects'),
          API.get('/skills'),
          API.get('/certificates'),
          API.get('/contact'),
          API.get('/testimonials'),
          API.get('/testimonials/stats'),
        ]);

        const testimonialData = Array.isArray(testimonials.data) ? testimonials.data : [];
        const messageData = Array.isArray(messages.data) ? messages.data : [];

        setStats({
          projects: Array.isArray(projects.data) ? projects.data.length : 0,
          skills: Array.isArray(skills.data) ? skills.data.length : 0,
          certificates: Array.isArray(certificates.data) ? certificates.data.length : 0,
          messages: messageData.length,
          testimonials: testimonialData.length,
          averageRating: statsRes.data?.averageRating || 0,
        });

        setRecentMessages(messageData.slice(0, 3));
        setPendingTestimonials(
          testimonialData.filter((t) => t.status === 'pending').slice(0, 3)
        );
      } catch (error) {
        console.error('Dashboard fetch error:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    { title: 'Total Projects', value: stats.projects, icon: '🚀', color: '#6c63ff', link: '/admin/projects' },
    { title: 'Skills', value: stats.skills, icon: '💻', color: '#00d4ff', link: '/admin/skills' },
    { title: 'Certificates', value: stats.certificates, icon: '📜', color: '#a855f7', link: '/admin/certificates' },
    { title: 'Messages', value: stats.messages, icon: '✉️', color: '#f59e0b', link: '/admin/messages' },
    { title: 'Reviews', value: stats.testimonials, icon: '⭐', color: '#10b981', link: '/admin/testimonials' },
    { title: 'Avg Rating', value: stats.averageRating, icon: '🌟', color: '#ef4444', link: '/admin/testimonials' },
  ];

  const quickActions = [
    { title: 'Add Project', icon: '🚀', link: '/admin/projects', color: '#6c63ff' },
    { title: 'Add Skill', icon: '💻', link: '/admin/skills', color: '#00d4ff' },
    { title: 'Add Certificate', icon: '📜', link: '/admin/certificates', color: '#a855f7' },
    { title: 'Update Content', icon: '📝', link: '/admin/content', color: '#f59e0b' },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card"
        style={{ padding: '2rem', marginBottom: '2rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
              Welcome back, <span className="text-gradient">{adminInfo?.name || 'Admin'}!</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Here's what's happening with your portfolio today.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
              ● Live
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card"
            style={{ padding: '1.5rem', cursor: 'pointer' }}
            whileHover={{ y: -5, boxShadow: 'var(--shadow-glow)' }}
            onClick={() => window.location.href = card.link}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  {card.title}
                </p>
                <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: card.color }}>{card.value}</p>
              </div>
              <div style={{
                width: '56px',
                height: '56px',
                background: `linear-gradient(135deg, ${card.color}20, ${card.color}05)`,
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem'
              }}>
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card"
            style={{ padding: '1.5rem' }}
          >
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              📊 Quick Actions
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  to={action.link}
                  style={{
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '0.75rem',
                    textDecoration: 'none',
                    color: 'white',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    border: '1px solid transparent'
                  }}
                >
                  <div style={{ fontSize: '1.5rem' }}>{action.icon}</div>
                  <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', fontWeight: 500 }}>{action.title}</div>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card"
            style={{ padding: '1.5rem' }}
          >
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              ⏳ Pending Reviews
            </h2>
            {pendingTestimonials.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
                No pending reviews 🎉
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {pendingTestimonials.map((testimonial) => (
                  <div key={testimonial._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '0.5rem' }}>
                    <div>
                      <p style={{ fontWeight: 500 }}>{testimonial.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{testimonial.review?.substring(0, 50)}...</p>
                    </div>
                    <Link to="/admin/testimonials" style={{ fontSize: '0.75rem', color: 'var(--primary)', textDecoration: 'none' }}>
                      Review →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card"
          style={{ padding: '1.5rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>✉️ Recent Messages</h2>
            <Link to="/admin/messages" style={{ fontSize: '0.875rem', color: 'var(--primary)', textDecoration: 'none' }}>
              View all →
            </Link>
          </div>
          {recentMessages.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
              No messages yet
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentMessages.map((message) => (
                <div key={message._id} style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '0.5rem', borderLeft: !message.isRead ? '3px solid var(--primary)' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontWeight: 500 }}>{message.name}</p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {message.createdAt ? new Date(message.createdAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{message.subject}</p>
                  {!message.isRead && (
                    <span className="badge" style={{ marginTop: '0.5rem', background: 'rgba(108, 99, 255, 0.2)' }}>Unread</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;