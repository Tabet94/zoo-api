const express = require('express');
const router = express.Router();
const { login, registerEmployee, registerVet } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware')

// Login route
router.post('/login', login);

// Register employee and vet (admin only)
router.post('/register/employee', authMiddleware(['admin']), registerEmployee);
router.post('/register/vet', authMiddleware(['admin']), registerVet);

module.exports = router;
