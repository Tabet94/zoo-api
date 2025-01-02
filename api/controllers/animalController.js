const Animal = require('../models/Animal'); // MongoDB Animal model
const Habitat = require('../models/Habitat');
const VetReport = require('../models/VetReport'); // MongoDB VetReport model

// Get all animals
exports.getAllAnimals = async (req, res) => {
    try {
        const animals = await Animal.find()
            .populate('habitat')
            .populate('vetReports'); // Include related VetReports
        
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get animal by ID
exports.getAnimalById = async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id)
            .populate('habitat')
            .populate('vetReports'); // Include related VetReports
        
        if (!animal) return res.status(404).json({ message: 'Animal not found' });
        res.status(200).json(animal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new animal
exports.createAnimal = async (req, res) => {
    const { name, race, habitat } = req.body;

    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
    try {
        // Create the new animal
        const newAnimal = new Animal({
            name,
            race,
            habitat,
            imagesUrl: [imageUrl],
        });
        await newAnimal.save();

        // Update the corresponding habitat to include this animal
        if (habitat) {
            await Habitat.findByIdAndUpdate(
                habitat,
                { $push: { animals: newAnimal._id } },
                { new: true }
            );
        }

        res.status(201).json(newAnimal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update animal details
exports.updateAnimal = async (req, res) => {
    try {
        const updatedAnimal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAnimal) return res.status(404).json({ message: 'Animal not found' });
        res.status(200).json(updatedAnimal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an animal
exports.deleteAnimal = async (req, res) => {
    try {
        const deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
        if (!deletedAnimal) return res.status(404).json({ message: 'Animal not found' });

        // Remove the associated vetReports
        await VetReport.deleteMany({ animal: req.params.id });

        res.status(200).json({ message: 'Animal and associated vet reports deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
