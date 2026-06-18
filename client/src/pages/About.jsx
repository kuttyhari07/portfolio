import React, { useState, useEffect } from 'react';
import API from '../services/api';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await API.get('/about');
        setAboutData(res.data?.data || res.data || {});
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) return <Loader />;

  return (
    <section style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
      <div className="container">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title">About <span>Me</span></h1>
          <p className="section-subtitle">Get to know me better</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8"
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              <span className="text-gradient">Who Am I?</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {aboutData?.content}
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-8"
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              <span className="text-gradient">Career Objective</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {aboutData?.careerObjective}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass-card p-8 mt-8"
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            <span className="text-gradient">Education</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {aboutData?.education?.map((edu, index) => (
              <div key={index} style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'semibold', marginBottom: '0.25rem' }}>{edu.degree}</h3>
                <p style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}>{edu.institution}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{edu.year} • {edu.percentage}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;