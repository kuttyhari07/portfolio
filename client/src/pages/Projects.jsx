import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/projects');
        setProjects(res.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Get unique technologies for filter
  const allTechnologies = ['all', ...new Set(projects.flatMap(p => p.technologies || []))];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.technologies?.includes(filter));

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
          <h1 className="section-title">My <span>Projects</span></h1>
          <p className="section-subtitle">Here are some of my recent works that showcase my skills</p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: 'center',
            marginBottom: '3rem'
          }}
        >
          {allTechnologies.slice(0, 8).map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              style={{
                padding: '0.5rem 1.25rem',
                background: filter === tech ? 'var(--gradient-1)' : 'rgba(255, 255, 255, 0.05)',
                border: filter === tech ? 'none' : '1px solid var(--border)',
                borderRadius: '2rem',
                color: filter === tech ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'capitalize'
              }}
            >
              {tech === 'all' ? 'All Projects' : tech}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
              No projects found for "{filter}"
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '2rem'
          }}>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card"
                style={{ cursor: 'pointer' }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  {project.featured && (
                    <span style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      padding: '0.25rem 0.75rem',
                      background: 'var(--accent)',
                      borderRadius: '2rem',
                      fontSize: '0.65rem',
                      fontWeight: 'bold',
                      color: 'white'
                    }}>
                      ⭐ Featured
                    </span>
                  )}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1.5rem',
                    background: 'linear-gradient(transparent, rgba(7, 11, 26, 0.9))'
                  }} />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {project.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    {project.technologies?.slice(0, 4).map((tech, i) => (
                      <span key={i} className="badge">{tech}</span>
                    ))}
                    {project.technologies?.length > 4 && (
                      <span className="badge">+{project.technologies.length - 4}</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', flex: 1, textAlign: 'center' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        🌐 Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', flex: 1, textAlign: 'center' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        🐙 GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
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
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card"
            style={{ maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative' }}>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
              <button
                onClick={() => setSelectedProject(null)}
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
              <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {selectedProject.title}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                {selectedProject.technologies?.map((tech, i) => (
                  <span key={i} className="badge">{tech}</span>
                ))}
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                {selectedProject.description}
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {selectedProject.liveDemoUrl && (
                  <a href={selectedProject.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    🌐 Live Demo
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    🐙 GitHub Repository
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Projects;