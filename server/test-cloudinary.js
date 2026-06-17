const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

console.log('🔧 Testing Cloudinary Configuration...');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME || 'NOT SET');
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '✅ SET' : '❌ NOT SET');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✅ SET' : '❌ NOT SET');

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.log('❌ Cloudinary credentials are missing!');
  console.log('Please add them to your .env file');
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('☁️ Testing Cloudinary upload with a small test image...');

// Create a small test image (1x1 pixel red)
const testImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJlZCIvPjwvc3ZnPg==';

cloudinary.uploader.upload(
  testImage,
  { folder: 'portfolio/test' },
  (error, result) => {
    if (error) {
      console.log('❌ Cloudinary upload test FAILED!');
      console.log('Error:', error.message);
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Check your Cloudinary credentials in .env');
      console.log('2. Make sure you have internet connection');
      console.log('3. Check if your Cloudinary account is active');
    } else {
      console.log('✅ Cloudinary upload test SUCCESSFUL!');
      console.log('URL:', result.secure_url);
      console.log('Public ID:', result.public_id);
    }
    process.exit(0);
  }
);