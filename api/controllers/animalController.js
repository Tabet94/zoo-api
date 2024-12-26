const Animal = require('../models/Animal'); // MongoDB Animal model
const Habitat = require ('../models/Habitat');

// Get all animals
exports.getAllAnimals = async (req, res) => {
    try {
        const animals = await Animal.find().populate('habitat'); // Remove .populate('race')
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get animal by ID
exports.getAnimalById = async (req, res) => {
    try {
        const animal = await Animal.findById(req.params.id).populate('habitat'); // Remove .populate('race')
        if (!animal) return res.status(404).json({ message: 'Animal not found' });
        res.status(200).json(animal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Create a new animal
// Create a new animal
exports.createAnimal = async (req, res) => {
    const { name, race, habitat } = req.body;
    try {
        // Create the new animal
        const newAnimal = new Animal({ name, race, habitat });
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
        res.status(200).json({ message: 'Animal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
