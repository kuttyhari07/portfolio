const express = require('express');
const {
  getApprovedTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonialStatus,
  deleteTestimonial,
  getReviewStats,
} = require('../controllers/testimonialController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/approved', getApprovedTestimonials);
router.get('/stats', getReviewStats);
router.get('/', protect, getAllTestimonials);
router.post('/', createTestimonial);
router.put('/:id/status', protect, updateTestimonialStatus);
router.delete('/:id', protect, deleteTestimonial);

module.exports = router;