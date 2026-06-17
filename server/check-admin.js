const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const checkAdmin = async () => {
  try {
    console.log('🔧 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hariharan_portfolio');
    console.log('✅ Connected');

    const db = mongoose.connection.db;
    
    // Check admins collection
    const admins = await db.collection('admins').find({}).toArray();
    console.log('📋 Admins found:', admins.length);
    
    if (admins.length > 0) {
      console.log('📧 Admin emails:', admins.map(a => a.email));
      console.log('🔑 Password hash starts with:', admins[0].password.substring(0, 20) + '...');
      
      // Try to verify password
      const bcrypt = require('bcryptjs');
      const isMatch = await bcrypt.compare('Admin@123456', admins[0].password);
      console.log('🔐 Password "Admin@123456" matches:', isMatch ? '✅ YES' : '❌ NO');
      
    } else {
      console.log('❌ No admins found!');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

checkAdmin();