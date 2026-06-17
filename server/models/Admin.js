const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'admin',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  console.log('🔐 Hashing password for:', this.email);
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
adminSchema.methods.comparePassword = async function (enteredPassword) {
  console.log('🔐 Comparing password for:', this.email);
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  console.log('🔐 Password match:', isMatch);
  return isMatch;
};

module.exports = mongoose.model('Admin', adminSchema);