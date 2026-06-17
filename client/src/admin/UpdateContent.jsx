import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const API_URL = 'http://localhost:5000/api';

const UpdateContent = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [homeData, setHomeData] = useState({
    name: '',
    title: '',
    introText: '',
    typingTexts: [],
    profilePhoto: '',
    resumeUrl: '',
  });

  const [aboutData, setAboutData] = useState({
    content: '',
    careerObjective: '',
    education: [],
  });

  const [newTypingText, setNewTypingText] = useState('');
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    year: '',
    percentage: '',
  });

  const tabs = [
    { id: 'home', label: '🏠 Home' },
    { id: 'about', label: '👤 About' },
    { id: 'education', label: '🎓 Education' },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const getHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return { Authorization: `Bearer ${token}` };
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const [homeRes, aboutRes] = await Promise.all([
        axios.get(`${API_URL}/home`, { headers: getHeaders() }),
        axios.get(`${API_URL}/about`, { headers: getHeaders() }),
      ]);

      setHomeData(homeRes.data);
      setAboutData(aboutRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPG, PNG, GIF, and WEBP images are allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be below 5MB');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', 'profile');

    try {
      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          ...getHeaders(),
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        setHomeData({ ...homeData, [type]: res.data.url });
        toast.success('Image uploaded successfully');
      } else {
        toast.error(res.data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Image upload error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('PDF must be below 10MB');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', 'resume');

    try {
      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          ...getHeaders(),
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        setHomeData({ ...homeData, resumeUrl: res.data.url });
        toast.success('Resume uploaded successfully');
      } else {
        toast.error(res.data.message || 'Resume upload failed');
      }
    } catch (error) {
      console.error('Resume upload error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };

  const handleHomeUpdate = async () => {
    try {
      await axios.put(`${API_URL}/home`, homeData, {
        headers: getHeaders(),
      });

      toast.success('Home content updated successfully');
    } catch (error) {
      console.error('Home update error:', error.response?.data || error.message);
      toast.error('Failed to update home content');
    }
  };

  const handleAboutUpdate = async () => {
    try {
      await axios.put(`${API_URL}/about`, aboutData, {
        headers: getHeaders(),
      });

      toast.success('About content updated successfully');
    } catch (error) {
      console.error('About update error:', error.response?.data || error.message);
      toast.error('Failed to update about content');
    }
  };

  const addTypingText = () => {
    if (!newTypingText.trim()) {
      toast.error('Please enter typing text');
      return;
    }

    setHomeData({
      ...homeData,
      typingTexts: [...(homeData.typingTexts || []), newTypingText.trim()],
    });

    setNewTypingText('');
  };

  const removeTypingText = (index) => {
    setHomeData({
      ...homeData,
      typingTexts: homeData.typingTexts.filter((_, i) => i !== index),
    });
  };

  const addEducation = () => {
    if (!newEducation.degree || !newEducation.institution) {
      toast.error('Degree and institution required');
      return;
    }

    setAboutData({
      ...aboutData,
      education: [...(aboutData.education || []), newEducation],
    });

    setNewEducation({
      degree: '',
      institution: '',
      year: '',
      percentage: '',
    });
  };

  const removeEducation = (index) => {
    setAboutData({
      ...aboutData,
      education: aboutData.education.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', color: 'white' }}>
        Loading content...
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
          <span className="text-gradient">Update Content</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Manage your website dynamic content
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'home' && (
        <motion.div className="glass-card" style={{ padding: '2rem' }}>
          <h2>Home Page Content</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label>Profile Photo</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'profilePhoto')} />

            {homeData.profilePhoto && (
              <img
                src={homeData.profilePhoto}
                alt="Profile"
                style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }}
              />
            )}

            <label>Resume PDF</label>
            <input type="file" accept=".pdf" onChange={handleResumeUpload} />

            {uploading && <p>Uploading...</p>}

            {homeData.resumeUrl && (
              <a href={homeData.resumeUrl} target="_blank" rel="noopener noreferrer">
                View Current Resume
              </a>
            )}

            <label>Name</label>
            <input
              type="text"
              value={homeData.name || ''}
              onChange={(e) => setHomeData({ ...homeData, name: e.target.value })}
            />

            <label>Title</label>
            <input
              type="text"
              value={homeData.title || ''}
              onChange={(e) => setHomeData({ ...homeData, title: e.target.value })}
            />

            <label>Intro Text</label>
            <textarea
              rows="4"
              value={homeData.introText || ''}
              onChange={(e) => setHomeData({ ...homeData, introText: e.target.value })}
            />

            <label>Typing Texts</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={newTypingText}
                onChange={(e) => setNewTypingText(e.target.value)}
                placeholder="Add typing text"
              />
              <button onClick={addTypingText} className="btn-primary">Add</button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {(homeData.typingTexts || []).map((text, index) => (
                <span key={index} className="badge">
                  {text}
                  <button onClick={() => removeTypingText(index)}> × </button>
                </span>
              ))}
            </div>

            <button onClick={handleHomeUpdate} className="btn-primary">
              Save Home Content
            </button>
          </div>
        </motion.div>
      )}

      {activeTab === 'about' && (
        <motion.div className="glass-card" style={{ padding: '2rem' }}>
          <h2>About Page Content</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label>About Content</label>
            <textarea
              rows="6"
              value={aboutData.content || ''}
              onChange={(e) => setAboutData({ ...aboutData, content: e.target.value })}
            />

            <label>Career Objective</label>
            <textarea
              rows="4"
              value={aboutData.careerObjective || ''}
              onChange={(e) => setAboutData({ ...aboutData, careerObjective: e.target.value })}
            />

            <button onClick={handleAboutUpdate} className="btn-primary">
              Save About Content
            </button>
          </div>
        </motion.div>
      )}

      {activeTab === 'education' && (
        <motion.div className="glass-card" style={{ padding: '2rem' }}>
          <h2>Education</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Degree"
              value={newEducation.degree}
              onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
            />
            <input
              type="text"
              placeholder="Institution"
              value={newEducation.institution}
              onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
            />
            <input
              type="text"
              placeholder="Year"
              value={newEducation.year}
              onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
            />
            <input
              type="text"
              placeholder="Percentage / CGPA"
              value={newEducation.percentage}
              onChange={(e) => setNewEducation({ ...newEducation, percentage: e.target.value })}
            />
          </div>

          <button onClick={addEducation} className="btn-primary" style={{ marginTop: '1rem' }}>
            Add Education
          </button>

          <div style={{ marginTop: '1.5rem' }}>
            {(aboutData.education || []).map((edu, index) => (
              <div key={index} className="glass-card" style={{ padding: '1rem', marginBottom: '1rem' }}>
                <h3>{edu.degree}</h3>
                <p>{edu.institution}</p>
                <p>{edu.year} • {edu.percentage}</p>
                <button onClick={() => removeEducation(index)} className="btn-secondary">
                  Delete
                </button>
              </div>
            ))}
          </div>

          <button onClick={handleAboutUpdate} className="btn-primary">
            Save Education Content
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default UpdateContent;
