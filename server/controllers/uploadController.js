const path = require('path');
const fs = require('fs');

const uploadImage = async (req, res) => {
  try {
    console.log('=== UPLOAD REQUEST STARTED ===');
    
    if (!req.file) {
      console.log('❌ No file');
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    console.log('✅ File:', req.file.originalname, req.file.size);
    
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const timestamp = Date.now();
    const ext = path.extname(req.file.originalname);
    const filename = `${timestamp}${ext}`;
    const filepath = path.join(uploadDir, filename);
    
    fs.writeFileSync(filepath, req.file.buffer);
    console.log('✅ Saved to:', filepath);
    
    const url = `http://localhost:5000/uploads/${filename}`;
    console.log('🔗 URL:', url);
    
    res.json({ success: true, url: url });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { uploadImage };