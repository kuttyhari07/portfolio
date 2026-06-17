const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔐 Login attempt for:', email);

    // Find admin
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      console.log('❌ Admin not found:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('✅ Admin found:', admin.email);

    // Check password
    const isMatch = await admin.comparePassword(password);
    console.log('🔐 Password match:', isMatch);

    if (isMatch) {
      console.log('✅ Login successful for:', email);
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      console.log('❌ Invalid password for:', email);
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('❌ Login error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    res.json(admin);
  } catch (error) {
    console.error('❌ Profile error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginAdmin, getAdminProfile };