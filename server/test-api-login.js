const http = require('http');

const data = JSON.stringify({
  email: 'admin@hariharan.com',
  password: 'Admin@123456'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('🔐 Testing login...');

const req = http.request(options, (res) => {
  console.log('📡 Status Code:', res.statusCode);
  
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('📦 Response:', responseData);
    try {
      const parsed = JSON.parse(responseData);
      if (parsed.token) {
        console.log('✅ Login SUCCESS!');
        console.log('👤 Name:', parsed.name);
        console.log('📧 Email:', parsed.email);
        console.log('🔑 Token:', parsed.token.substring(0, 30) + '...');
      } else {
        console.log('❌ Login FAILED:', parsed.message);
      }
    } catch (e) {
      console.log('❌ Invalid response:', responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request error:', error.message);
  console.log('💡 Make sure the backend server is running on port 5000');
});

req.write(data);
req.end();