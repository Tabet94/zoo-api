const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log("Plaintext Password:", password);
    console.log("Stored Hash:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);

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
    console.error("Login error:", error);
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

    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployee = new User({ email, username, password: hashedPassword, role: 'employee' });
    await newEmployee.save();
    res.status(201).json({ message: 'Employee registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register veterinarian (Admin only)
exports.registerVet = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized action. Only admins can register veterinarians.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newVet = new User({ email, username, password: hashedPassword, role: 'veterinarian' });
    await newVet.save();
    res.status(201).json({ message: 'Veterinarian registered successfully' });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message });
  }
};
