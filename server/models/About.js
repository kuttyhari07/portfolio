const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  careerObjective: {
    type: String,
    required: true,
  },
  education: [
    {
      degree: String,
      institution: String,
      year: String,
      percentage: String,
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('About', aboutSchema);