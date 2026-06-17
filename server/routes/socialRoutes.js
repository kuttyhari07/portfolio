const express = require('express');
const { getSocialLinks, createSocialLink, updateSocialLink, deleteSocialLink } = require('../controllers/socialController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getSocialLinks);
router.post('/', protect, createSocialLink);
router.put('/:platform', protect, updateSocialLink);
router.delete('/:platform', protect, deleteSocialLink);

module.exports = router;