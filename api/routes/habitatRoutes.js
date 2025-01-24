const express = require('express');
const router = express.Router();
const { 
    getAllHabitats, 
    getHabitatById, 
    createHabitat, 
    updateHabitat, 
    deleteHabitat 
} = require('../controllers/habitatController');
const upload = require('../config/multer');

// Visitor routes
router.get('/', getAllHabitats); // List all habitats
router.get('/:id', getHabitatById); // Get habitat details by ID

// Admin routes
router.post('/',upload.single('image'), createHabitat); // Add a new habitat
router.put('/:id', updateHabitat); // Update habitat details
router.delete('/:id', deleteHabitat); // Delete a habitat

module.exports = router;
