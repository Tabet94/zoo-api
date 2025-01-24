const Animal = require('../models/Animal'); // MongoDB Animal model
const Habitat = require('../models/Habitat');
const VetReport = require('../models/VetReport'); // MongoDB VetReport model
const FoodRecord = require('../models/FoodRecord')
const Stat = require('../models/Stat')

// Get all animals
exports.getAllAnimals = async (req, res) => {
    try {
        const animals = await Animal.find()
            .populate('habitat')
            .populate('vetReports')
            .populate('foodRecords')
             
        
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.getAnimalById = async (req, res) => {
    try {
        // Find the animal by ID and populate references
        const animal = await Animal.findById(req.params.id)
            .populate('habitat')
            .populate('vetReports')
            .populate('foodRecords')
            .populate('stats'); // Include stats in population

        if (!animal) return res.status(404).json({ message: 'Animal not found' });

        // Increment the views count in the associated stats
        if (animal.stats) {
            await Stat.findByIdAndUpdate(
                animal.stats._id,
                { $inc: { views: 1 } }, // Increment views by 1
                { new: true } // Return the updated document
            );
        } else {
            // Optionally create a stats document if none exists
            const newStat = await Stat.create({ animal: animal._id, views: 1 });
            animal.stats = newStat._id;
            await animal.save();
        }

        res.status(200).json(animal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createAnimal = async (req, res) => {
    const { name, race, habitat } = req.body;

    // Use Cloudinary URL if file is uploaded
    const imageUrl = req.file ? req.file.path : null;

    try {
        // Create the new animal
        const newAnimal = new Animal({
            name,
            race,
            habitat,
            imagesUrl: imageUrl ? [imageUrl] : [], // Assuming multiple images in the future
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

        res.status(201).json(newAnimal); // Return the newly created animal
    } catch (error) {
        res.status(500).json({ message: error.message }); // Return the error message
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

        // Remove the associated 
        await VetReport.deleteMany({ animal: req.params.id });
        await FoodRecord.deleteMany({ animal: req.params.id });

        res.status(200).json({ message: 'Animal and associated vet reports deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
