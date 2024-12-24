const Review = require('../models/Review'); // MongoDB Review model

// Create a review
exports.createReview = async (req, res) => {
    const { pseudo, commentaire } = req.body;
    try {
        const newReview = new Review({ pseudo, commentaire, isVisible: false });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Approve a review
exports.approveReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, { isVisible: true }, { new: true });
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
