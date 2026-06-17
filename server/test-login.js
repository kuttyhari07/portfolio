const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const testLogin = async () => {
  try {
    console.log('🔐 Testing admin login...');
    
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@hariharan.com',
      password: 'Admin@123456'
    });
    
    console.log('✅ Login successful!');
    console.log('📧 Email:', response.data.email);
    console.log('🔑 Token:', response.data.token);
    console.log('👤 Name:', response.data.name);
    
  } catch (error) {
    console.error('❌ Login failed!');
    console.error('Status:', error.response?.status);
    console.error('Message:', error.response?.data?.message);
    console.error('Full error:', error.response?.data);
  }
};

testLogin();