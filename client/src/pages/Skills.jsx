import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get('/api/skills');
        setSkills(res.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) return <Loader />;

  const skillIcons = {
    JavaScript: '📜',
    React: '⚛️',
    'Node.js': '🟢',
    MongoDB: '🍃',
    Python: '🐍',
    HTML5: '🌐',
    CSS3: '🎨',
    'Tailwind CSS': '🎯',
    Git: '📊',
    Express: '🚂',
    default: '💻',
  };

  return (
    <section style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
      <div className="container">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title">My <span>Skills</span></h1>
          <p className="section-subtitle">Technologies and tools I work with</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill._id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '2rem' }}>{skillIcons[skill.name] || skillIcons.default}</span>
                  <h3 style={{ fontWeight: '600', fontSize: '1.125rem' }}>{skill.name}</h3>
                </div>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{skill.percentage}%</span>
              </div>
              <div className="progress-container">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="progress-fill"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;