const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Delete existing admin
    await Admin.deleteMany({});
    console.log('🗑️  Removed existing admins');

    // Create new admin
    const hashedPassword = await bcrypt.hash('Admin@123456', 10);
    
    const admin = await Admin.create({
      name: 'Admin',
      email: 'admin@hariharan.com',
      password: 'Admin@123456', // Will be hashed by pre-save hook
      role: 'admin',
    });

    console.log('✅ Admin created successfully!');
    console.log('📧 Email: admin@hariharan.com');
    console.log('🔑 Password: Admin@123456');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();  