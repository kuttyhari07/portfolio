const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('SocialLink', socialLinkSchema);