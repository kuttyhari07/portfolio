const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // Add this line
const connectDB = require('./config/db');
const Admin = require('./models/Admin');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ ADD THIS LINE - Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log('📁 Uploads directory served at /uploads');

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/home', require('./routes/homeRoutes'));
app.use('/api/about', require('./routes/aboutRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/social', require('./routes/socialRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
// Create default admin if not exists
const createDefaultAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      await Admin.create({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      });
      console.log('✅ Default admin created');
    }
  } catch (error) {
    console.error('Error creating admin:', error.message);
  }
};
createDefaultAdmin();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));