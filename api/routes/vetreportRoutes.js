const express = require('express');
const router = express.Router();
const { 
    createVetReport, 
    getVetReportsByAnimal, 
    getAllVetReports 
} = require('../controllers/vetreportController');

// Veterinarian routes
router.post('/:animalId', createVetReport); // Add a vet report for an animal
router.get('/:animalId', getVetReportsByAnimal); // Get vet reports for an animal

// Admin routes
router.get('/', getAllVetReports); // Get all vet reports (with filters)

module.exports = router;
