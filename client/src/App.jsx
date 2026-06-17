import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';

import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';

import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import ManageProjects from './admin/ManageProjects';
import ManageSkills from './admin/ManageSkills';
import ManageCertificates from './admin/ManageCertificates';
import ManageTestimonials from './admin/ManageTestimonials';
import ManageMessages from './admin/ManageMessages';
import UpdateContent from './admin/UpdateContent';
import ManageSocialLinks from './admin/ManageSocialLinks';

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="skills" element={<Skills />} />
            <Route path="projects" element={<Projects />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="skills" element={<ManageSkills />} />
            <Route path="certificates" element={<ManageCertificates />} />
            <Route path="testimonials" element={<ManageTestimonials />} />
            <Route path="messages" element={<ManageMessages />} />
            <Route path="content" element={<UpdateContent />} />
            <Route path="social" element={<ManageSocialLinks />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;