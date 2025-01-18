const express = require('express');
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  toggleReviewVisibility,
} = require('../controllers/reviewController');

const router = express.Router();

// Define the routes
router.post('/', createReview);
router.get('/', getAllReviews);
router.get('/:id', getReviewById);
router.delete('/:id', deleteReview);
router.patch('/:id/toggle-visibility', toggleReviewVisibility);

module.exports = router;
