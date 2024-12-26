const express = require('express');
const router = express.Router();
const { 
    getAllHabitats, 
    getHabitatById, 
    createHabitat, 
    updateHabitat, 
    deleteHabitat 
} = require('../controllers/habitatController');
const multer = require ('../config/multer')

// Visitor routes
router.get('/', getAllHabitats); // List all habitats
router.get('/:id', getHabitatById); // Get habitat details by ID

// Admin routes
router.post('/', multer, createHabitat); // Add a new habitat
router.put('/:id', updateHabitat); // Update habitat details
router.delete('/:id', deleteHabitat); // Delete a habitat

module.exports = router;
