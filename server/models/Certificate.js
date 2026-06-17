const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  issuedBy: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  credentialUrl: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Certificate', certificateSchema);