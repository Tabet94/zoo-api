const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.options('*', cors())

// Middleware
app.use(express.json());

// Load base API URL from the .env file or default to '/api/v1'
const API_URL = process.env.API_URL || '/api/v1';
console.log(`API routes base URL: ${API_URL}`);


// Routes
app.use(`${API_URL}/auth`, require('./routes/authRoutes'));
app.use(`${API_URL}/animals`, require('./routes/animalRoutes'));
app.use(`${API_URL}/habitats`, require('./routes/habitatRoutes'));
app.use(`${API_URL}/services`, require('./routes/serviceRoutes'));
app.use(`${API_URL}/reviews`, require('./routes/reviewRoutes'));
app.use(`${API_URL}/foodrecord`, require('./routes/foodrecordRoutes'));
app.use(`${API_URL}/vetreport`, require('./routes/vetreportRoutes'));
app.use(`${API_URL}/stat`, require('./routes/animalstatsRoutes'));

module.exports = app;
