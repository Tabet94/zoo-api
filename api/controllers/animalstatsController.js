const Stat = require('../models/Stat'); // MongoDB Stat model

// Increment view count for an animal
exports.incrementAnimalView = async (req, res) => {
    const { animalId } = req.params;
    try {
        let stat = await Stat.findOne({ animal: animalId });
        if (!stat) {
            stat = new Stat({ animal: animalId, views: 1 });
        } else {
            stat.views += 1;
        }
        await stat.save();
        res.status(200).json(stat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get animal view statistics
exports.getAnimalStats = async (req, res) => {
    try {
        const stats = await Stat.find().populate('animal');
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
