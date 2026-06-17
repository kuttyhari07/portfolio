const cloudinary = require('../config/cloudinary');

const uploadImage = async (req, res) => {
  try {
    console.log('=== CLOUDINARY UPLOAD STARTED ===');

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const folder = req.body.folder || 'portfolio';
    const isPdf = req.file.mimetype === 'application/pdf';

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `hariharan-portfolio/${folder}`,
          resource_type: isPdf ? 'raw' : 'image',
          format: isPdf ? 'pdf' : undefined,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    res.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Upload failed',
    });
  }
};

module.exports = { uploadImage };