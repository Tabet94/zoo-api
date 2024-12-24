const express = require('express');
const router = express.Router();
const { incrementAnimalView, getAnimalStats } = require('../controllers/animalstatsController');

// Visitor route
router.post('/:animalId/view', incrementAnimalView); // Increment view count for an animal

// Admin route
router.get('/', getAnimalStats); // Get animal stats

module.exports = router;
