const Certificate = require('../models/Certificate');

const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort('-issueDate');
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.create(req.body);
    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Certificate deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCertificates, createCertificate, updateCertificate, deleteCertificate };