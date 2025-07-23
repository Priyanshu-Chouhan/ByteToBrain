const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const authMiddleware = require('../utils/authMiddleware');

router.get('/', testimonialController.getAll);
router.post('/', authMiddleware, testimonialController.create);
router.delete('/:id', authMiddleware, testimonialController.delete);

module.exports = router; 