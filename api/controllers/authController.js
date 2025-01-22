const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      
      return res.status(404).json({ message: 'User not found' });
    }

    

    const isMatch = await bcrypt.compare(password, user.password);
    

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ token });
  } catch (error) {
   
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};


// Register employee (Admin only)
exports.registerEmployee = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized action. Only admins can register employees.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const newEmployee = new User({ email, username, password, role: 'employee' });
    await newEmployee.save(); // Password hashing handled by middleware
    res.status(201).json({ message: 'Employee registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.registerVet = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized action. Only admins can register veterinarians.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const newVet = new User({ email, username, password, role: 'veterinarian' });
    await newVet.save(); // Password hashing handled by middleware
    res.status(201).json({ message: 'Veterinarian registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

