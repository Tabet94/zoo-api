const express = require('express');
const router = express.Router();
const { 
    createReview, 
    getAllReviews, 
    approveReview, 
    deleteReview 
} = require('../controllers/reviewController');

// Visitor route
router.post('/', createReview); // Submit a new review

// Admin/Employee routes
router.get('/', getAllReviews); // List all reviews (pending and approved)
router.put('/:id/approve', approveReview); // Approve a review
router.delete('/:id', deleteReview); // Delete a review

module.exports = router;
