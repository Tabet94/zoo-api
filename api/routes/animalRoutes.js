const express = require('express');
const router = express.Router();
const { 
    getAllAnimals, 
    getAnimalById, 
    createAnimal, 
    updateAnimal, 
    deleteAnimal 
} = require('../controllers/animalController');
const upload = require('../config/multer');

// Visitor routes
router.get('/', getAllAnimals); // List all animals
router.get('/:id', getAnimalById); // Get animal details by ID

// Admin routes
router.post('/', upload.single('image'), createAnimal); // Add a new animal
router.put('/:id', updateAnimal); // Update animal details
router.delete('/:id', deleteAnimal); // Delete an animal

module.exports = router;
