const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const createAdmin = async () => {
  try {
    console.log('🔧 Connecting...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hariharan_portfolio');
    console.log('✅ Connected');

    const db = mongoose.connection.db;

    // Delete existing
    await db.collection('admins').deleteMany({});
    console.log('🗑️  Removed existing');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123456', salt);
    
    console.log('🔐 Generated hash');

    // Insert admin
    await db.collection('admins').insertOne({
      name: 'Admin',
      email: 'admin@hariharan.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
    });

    console.log('✅ Admin created');

    // Verify
    const saved = await db.collection('admins').findOne({ email: 'admin@hariharan.com' });
    console.log('✅ Verified:', saved.email);

    // Test
    const isMatch = await bcrypt.compare('Admin@123456', saved.password);
    console.log('🔐 Password test:', isMatch ? '✅ MATCHES!' : '❌ FAILED');

    if (isMatch) {
      console.log('\n🎉 SUCCESS! Admin credentials:');
      console.log('📧 Email: admin@hariharan.com');
      console.log('🔑 Password: Admin@123456');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();