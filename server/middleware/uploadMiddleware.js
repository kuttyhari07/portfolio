const multer = require('multer');
const path = require('path');

console.log('🔧 Initializing upload middleware...');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  console.log('📁 File filter checking:', file.originalname, file.mimetype);

  const allowedTypes = /jpeg|jpg|png|gif|webp|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf'
  ];

  const mimetype = allowedMimeTypes.includes(file.mimetype);

  if (mimetype && extname) {
    console.log('✅ File type accepted');
    return cb(null, true);
  } else {
    console.log('❌ File type rejected');
    cb(new Error('Only images and PDF files are allowed'));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter,
});

module.exports = { upload };