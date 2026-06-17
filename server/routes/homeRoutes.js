const express = require('express');
const { getHome, updateHome } = require('../controllers/homeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getHome);
router.put('/', protect, updateHome);

module.exports = router;