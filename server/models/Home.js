const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Hari Haran',
  },
  title: {
    type: String,
    required: true,
    default: 'IT Student & Full Stack Developer',
  },
  introText: {
    type: String,
    required: true,
    default: 'Passionate about building innovative solutions...',
  },
  profilePhoto: {
    type: String,
    default: '',
  },
  resumeUrl: {
    type: String,
    default: '',
  },
  typingTexts: [
    {
      type: String,
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Home', homeSchema);