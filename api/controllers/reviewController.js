const Review = require("../models/Review")

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { pseudo, comment } = req.body;

    if (!pseudo || !comment) {
      return res.status(400).json({ message: 'Pseudo and comment are required.' });
    }

    const newReview = new Review({ pseudo, comment });
    await newReview.save();

    res.status(201).json({ message: 'Review created successfully.', review: newReview });
  } catch (error) {
    res.status(500).json({ message: 'Error creating review.', error: error.message });
  }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews.', error: error.message });
  }
};

// Get a single review by ID
exports.getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching review.', error: error.message });
  }
};



// Delete a review by ID
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    res.status(200).json({ message: 'Review deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review.', error: error.message });
  }
};

// Toggle review visibility
exports.toggleReviewVisibility = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    review.isVisible = !review.isVisible;
    await review.save();

    res.status(200).json({ message: 'Review visibility toggled successfully.', review });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling visibility.', error: error.message });
  }
};

