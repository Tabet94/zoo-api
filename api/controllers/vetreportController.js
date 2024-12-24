const VetReport = require('../models/VetReport'); // MongoDB VetReport model

// Get all veterinarian reports
exports.getAllVetReports = async (req, res) => {
    try {
        const reports = await VetReport.find().populate('animal');
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get vet reports by animal
exports.getVetReportsByAnimal = async (req, res) => {
    try {
        const reports = await VetReport.find({ animal: req.params.animalId });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a vet report
exports.createVetReport = async (req, res) => {
    const { animal, state, food, quantity, date, details } = req.body;
    try {
        const newReport = new VetReport({ animal, state, food, quantity, date, details });
        await newReport.save();
        res.status(201).json(newReport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a vet report
exports.updateVetReport = async (req, res) => {
    try {
        const updatedReport = await VetReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReport) return res.status(404).json({ message: 'Vet report not found' });
        res.status(200).json(updatedReport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a vet report
exports.deleteVetReport = async (req, res) => {
    try {
        const deletedReport = await VetReport.findByIdAndDelete(req.params.id);
        if (!deletedReport) return res.status(404).json({ message: 'Vet report not found' });
        res.status(200).json({ message: 'Vet report deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
