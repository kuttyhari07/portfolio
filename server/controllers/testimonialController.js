const Testimonial = require('../models/Testimonial');

const getApprovedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: 'approved' }).sort('-createdAt');
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort('-createdAt');
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create({ ...req.body, status: 'pending' });
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTestimonialStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReviewStats = async (req, res) => {
  try {
    const approved = await Testimonial.find({ status: 'approved' });
    const totalReviews = approved.length;
    const averageRating = approved.reduce((sum, t) => sum + t.rating, 0) / totalReviews || 0;
    res.json({ totalReviews, averageRating: averageRating.toFixed(1) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getApprovedTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonialStatus,
  deleteTestimonial,
  getReviewStats,
};