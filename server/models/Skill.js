const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  icon: {
    type: String,
    default: 'code',
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'database', 'tools', 'other'],
    default: 'other',
  },
  order: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Skill', skillSchema);