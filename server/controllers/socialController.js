const SocialLink = require('../models/SocialLink');

const getSocialLinks = async (req, res) => {
  try {
    const links = await SocialLink.find().sort('order');
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSocialLink = async (req, res) => {
  try {
    const { platform, url, icon, order } = req.body;
    const link = await SocialLink.create({ platform, url, icon, order });
    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSocialLink = async (req, res) => {
  try {
    const { platform } = req.params;
    const link = await SocialLink.findOneAndUpdate(
      { platform },
      req.body,
      { new: true, upsert: true }
    );
    res.json(link);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSocialLink = async (req, res) => {
  try {
    const { platform } = req.params;
    await SocialLink.findOneAndDelete({ platform });
    res.json({ message: 'Social link deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSocialLinks, createSocialLink, updateSocialLink, deleteSocialLink };