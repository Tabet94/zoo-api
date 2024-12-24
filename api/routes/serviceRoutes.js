const express = require('express');
const router = express.Router();
const { 
    getAllServices, 
    getServiceById, 
    createService, 
    updateService, 
    deleteService 
} = require('../controllers/serviceController');

// Visitor routes
router.get('/', getAllServices); // List all services
router.get('/:id', getServiceById); // Get service details by ID

// Admin routes
router.post('/', createService); // Add a new service
router.put('/:id', updateService); // Update service details
router.delete('/:id', deleteService); // Delete a service

module.exports = router;
