const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const resetAll = async () => {
  try {
    console.log('🔧 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hariharan_portfolio');
    console.log('✅ Connected');

    const db = mongoose.connection.db;

    // Clear all collections
    console.log('🗑️  Clearing collections...');
    await db.collection('admins').deleteMany({});
    await db.collection('homes').deleteMany({});
    await db.collection('abouts').deleteMany({});

    console.log('✅ Collections cleared');

    // Create admin with proper hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123456', salt);
    
    await db.collection('admins').insertOne({
      name: 'Admin',
      email: 'admin@hariharan.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
    });

    console.log('✅ Admin created with hashed password');

    // Verify
    const admin = await db.collection('admins').findOne({ email: 'admin@hariharan.com' });
    console.log('✅ Verified admin exists');

    // Test password
    const testMatch = await bcrypt.compare('Admin@123456', admin.password);
    console.log('🔐 Password verification:', testMatch ? '✅ SUCCESS' : '❌ FAILED');

    // Create default home
    await db.collection('homes').insertOne({
      name: 'Hari Haran',
      title: 'IT Student & Full Stack Developer',
      introText: 'Passionate about building innovative solutions...',
      typingTexts: ['MERN Stack Developer', 'Problem Solver', 'Tech Enthusiast'],
      profilePhoto: '',
      resumeUrl: '',
      updatedAt: new Date(),
    });

    console.log('✅ Default home data created');

    // Create default about
    await db.collection('abouts').insertOne({
      content: 'I am Hari Haran, an enthusiastic IT student with a passion for full-stack web development.',
      careerObjective: 'To secure a challenging position in a reputable organization.',
      education: [
        {
          degree: 'B.Tech in Information Technology',
          institution: 'Anna University',
          year: '2021 - 2025',
          percentage: '8.9 CGPA'
        }
      ],
      updatedAt: new Date(),
    });

    console.log('✅ Default about data created');

    console.log('\n🎉 === COMPLETE RESET SUCCESSFUL ===');
    console.log('📧 Admin Email: admin@hariharan.com');
    console.log('🔑 Admin Password: Admin@123456');
    console.log('=====================================');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

resetAll();