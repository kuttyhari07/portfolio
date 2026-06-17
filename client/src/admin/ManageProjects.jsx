import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../services/api';
const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: [],
    liveDemoUrl: '',
    githubUrl: '',
    featured: false,
  });

  const [techInput, setTechInput] = useState('');

  const getHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return { Authorization: `Bearer ${token}` };
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await API.get('/projects');
      setProjects(res.data || []);
    } catch (error) {
      console.error('Fetch projects error:', error.response?.data || error.message);
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPG, PNG, GIF, and WEBP images are allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be below 5MB');
      return;
    }

    setUploading(true);

    const uploadFormData = new FormData();
    uploadFormData.append('image', file);
    uploadFormData.append('folder', 'projects');

    try {
      const res = await API.post('/upload', uploadFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        setFormData((prev) => ({
          ...prev,
          image: res.data.url,
        }));
        toast.success('Image uploaded successfully');
      } else {
        toast.error(res.data.message || 'Image upload failed');
      }
    } catch (error) {
      console.error('Project image upload error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProject) {
        await API.put(`/projects/${editingProject._id}`, formData);
        toast.success('Project updated successfully');
      } else {
        await API.post('/projects', formData);
        toast.success('Project created successfully');
      }

      await fetchProjects();
      closeModal();
    } catch (error) {
      console.error('Save project error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to save project');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await API.delete(`/projects/${id}`);

      toast.success('Project deleted');
      fetchProjects();
    } catch (error) {
      console.error('Delete project error:', error.response?.data || error.message);
      toast.error('Failed to delete project');
    }
  };

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title || '',
        description: project.description || '',
        image: project.image || '',
        technologies: project.technologies || [],
        liveDemoUrl: project.liveDemoUrl || '',
        githubUrl: project.githubUrl || '',
        featured: project.featured || false,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        technologies: [],
        liveDemoUrl: '',
        githubUrl: '',
        featured: false,
      });
    }

    setTechInput('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setTechInput('');
  };

  const addTechnology = () => {
    const tech = techInput.trim();

    if (!tech) {
      toast.error('Enter technology name');
      return;
    }

    if (formData.technologies.includes(tech)) {
      toast.error('Technology already added');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      technologies: [...prev.technologies, tech],
    }));

    setTechInput('');
  };

  const removeTechnology = (tech) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Manage Projects</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Add, edit, or remove your portfolio projects</p>
        </div>

        <button onClick={() => openModal()} className="btn-primary">
          + Add New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>No projects yet</p>
          <button onClick={() => openModal()} className="btn-primary">Add Your First Project</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card"
            >
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                    No Image
                  </div>
                )}

                {project.featured && (
                  <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--accent)', padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    Featured
                  </span>
                )}
              </div>

              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                  {(project.description || '').substring(0, 100)}...
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  {(project.technologies || []).slice(0, 3).map((tech, i) => (
                    <span key={i} className="badge">{tech}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => openModal(project)} style={{ flex: 1, padding: '0.5rem', background: 'rgba(108, 99, 255, 0.2)', border: 'none', borderRadius: '0.5rem', color: 'var(--primary)', cursor: 'pointer' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(project._id)} style={{ flex: 1, padding: '0.5rem', background: 'rgba(239, 68, 68, 0.2)', border: 'none', borderRadius: '0.5rem', color: 'var(--error)', cursor: 'pointer' }}>
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

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
              style={{ maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />

                  <textarea
                    placeholder="Project Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="4"
                    required
                  />

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Project Image</label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />

                    {uploading && (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>Uploading...</p>
                    )}

                    {formData.image && !uploading && (
                      <img src={formData.image} alt="Preview" style={{ marginTop: '0.5rem', height: '100px', borderRadius: '0.5rem' }} />
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Technologies</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="text"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTechnology();
                          }
                        }}
                        placeholder="Add technology"
                        style={{ flex: 1 }}
                      />

                      <button type="button" onClick={addTechnology} style={{ padding: '0 1rem', background: 'var(--primary)', border: 'none', borderRadius: '0.5rem', color: 'white', cursor: 'pointer' }}>
                        Add
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
                      {(formData.technologies || []).map((tech) => (
                        <span key={tech} className="badge" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {tech}
                          <button type="button" onClick={() => removeTechnology(tech)} style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', fontSize: '1rem' }}>×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <input
                    type="url"
                    placeholder="Live Demo URL"
                    value={formData.liveDemoUrl}
                    onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                  />

                  <input
                    type="url"
                    placeholder="GitHub URL"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  />

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      style={{ width: 'auto' }}
                    />
                    <span>Featured Project</span>
                  </label>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                      {editingProject ? 'Update' : 'Create'}
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

export default ManageProjects;