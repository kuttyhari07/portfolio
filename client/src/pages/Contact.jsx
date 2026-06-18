import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import API from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Contact = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const res = await API.get('/social');
        const data = res.data?.data || res.data?.socialLinks || res.data || [];
        setSocialLinks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };
    fetchSocialLinks();
  }, []);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await API.post('/contact', data);
      toast.success('Message sent successfully! 🎉');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: '📧', title: 'Email', value: 'gmhktechstudio0429@gmail.com', link: 'mailto:gmhktechstudio0429@gmail.com' },
    { icon: '📱', title: 'Phone', value: '+91 6380911912', link: 'tel:+91 6380911912' },
    { icon: '📍', title: 'Location', value: 'Erode, Tamil Nadu', link: null },
  ];

  const socialIcons = {
    github: '🐙',
    linkedin: '🔗',
    twitter: '🐦',
    email: '📧',
    instagram: '📸',
    facebook: '📘',
    youtube: '▶️',
    whatsapp: '💬',
  };

  return (
    <section style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title">Get In <span>Touch</span></h1>
          <p className="section-subtitle">Have a project in mind? Let's work together!</p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '2.5rem'
        }}>
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {/* Contact Cards */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.25rem' }}>
                <span className="text-gradient">Contact Information</span>
              </h2>
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    marginBottom: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '0.75rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(108, 99, 255, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--gradient-1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0
                  }}>
                    {info.icon}
                  </div>
                  <div>
                    <h3 style={{ fontWeight: '600', fontSize: '0.875rem', marginBottom: '0.1rem' }}>{info.title}</h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem' }}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                <span className="text-gradient">Connect With Me</span>
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.5 }}
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    whileHover={{
                      y: -5,
                      background: 'var(--primary)',
                      borderColor: 'var(--primary)',
                      boxShadow: 'var(--shadow-glow)'
                    }}
                  >
                    {socialIcons[link.platform] || '🔗'}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                <span className="text-gradient">Send Me a Message</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                I'll get back to you within 24 hours
              </p>

              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 500 }}>Your Name</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    placeholder="John Doe"
                    style={{
                      border: errors.name ? '1px solid var(--error)' : '1px solid var(--border)',
                      background: 'rgba(255, 255, 255, 0.05)'
                    }}
                  />
                  {errors.name && (
                    <p style={{ color: 'var(--error)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 500 }}>Email Address</label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                    })}
                    placeholder="john@example.com"
                    style={{
                      border: errors.email ? '1px solid var(--error)' : '1px solid var(--border)',
                      background: 'rgba(255, 255, 255, 0.05)'
                    }}
                  />
                  {errors.email && (
                    <p style={{ color: 'var(--error)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 500 }}>Subject</label>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    placeholder="Project Discussion"
                    style={{
                      border: errors.subject ? '1px solid var(--error)' : '1px solid var(--border)',
                      background: 'rgba(255, 255, 255, 0.05)'
                    }}
                  />
                  {errors.subject && (
                    <p style={{ color: 'var(--error)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 500 }}>Message</label>
                  <textarea
                    {...register('message', { required: 'Message is required', minLength: 10 })}
                    rows="5"
                    placeholder="Tell me about your project..."
                    style={{
                      resize: 'vertical',
                      border: errors.message ? '1px solid var(--error)' : '1px solid var(--border)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      minHeight: '120px'
                    }}
                  />
                  {errors.message && (
                    <p style={{ color: 'var(--error)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary"
                  style={{ padding: '1rem', width: '100%' }}
                >
                  {submitting ? '⏳ Sending...' : '✉️ Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          [style*="grid-template-columns: 1fr 1.5fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;