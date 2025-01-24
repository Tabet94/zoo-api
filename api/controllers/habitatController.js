const Habitat = require('../models/Habitat'); // MongoDB Habitat model

// Get all habitats
exports.getAllHabitats = async (req, res) => {
    try {
        const habitats = await Habitat.find();
        res.status(200).json(habitats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get habitat by ID
exports.getHabitatById = async (req, res) => {
    try {
        const habitat = await Habitat.findById(req.params.id).populate('animals');
        if (!habitat) return res.status(404).json({ message: 'Habitat not found' });
       
        res.status(200).json(habitat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Create a habitat
exports.createHabitat = async (req, res) => {
    const { name, description } = req.body;

    // Validate required fields
    if (!name || !description) {
        return res.status(400).json({ message: 'Name and description are required.' });
    }

    // Check if file is uploaded
    const imageUrl = req.file ? req.file.path : null;

    try {
        // Create new habitat with image URL
        const newHabitat = new Habitat({
            name,
            description,
            imagesUrl: imageUrl ? [imageUrl] : [], // Save the image URL(s) in the database
        });

        await newHabitat.save();
        res.status(201).json(newHabitat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a habitat
exports.updateHabitat = async (req, res) => {
    try {
        const updatedHabitat = await Habitat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedHabitat) return res.status(404).json({ message: 'Habitat not found' });
        res.status(200).json(updatedHabitat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a habitat
exports.deleteHabitat = async (req, res) => {
    try {
        const deletedHabitat = await Habitat.findByIdAndDelete(req.params.id);
        if (!deletedHabitat) return res.status(404).json({ message: 'Habitat not found' });
        res.status(200).json({ message: 'Habitat deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
