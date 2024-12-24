const express = require('express');
const router = express.Router();
const { 
    addFoodRecord, 
    getFoodRecordsByAnimal 
} = require('../controllers/foodrecordController');

// Employee routes
router.post('/:animalId', addFoodRecord); // Add a food entry for an animal
router.get('/:animalId', getFoodRecordsByAnimal); // Get all food entries for an animal

module.exports = router;
