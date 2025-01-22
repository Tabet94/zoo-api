const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv/config');

app.use(cors());
app.options('*', cors())

// const allowedOrigins = [
//     'https://zoo-rouge.vercel.app',
//     'https://zoo-tabets-projects-e195060b.vercel.app',
//     'https://zoo-2qqa1lcg7-tabets-projects-e195060b.vercel.app',
//   ];
  
//   app.use(
//     cors({
//       origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//           callback(null, true); // Allow the request
//         } else {
//           callback(new Error('Not allowed by CORS')); // Reject the request
//         }
//       },
//     })
//   );

// Middleware
app.use(express.json());

// Load base API URL from the .env file or default to '/api/v1'
const API_URL = process.env.API_URL || '/api/v1';
console.log(`API routes base URL: ${API_URL}`);
// Serve static files (images) from a specific directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use(`${API_URL}/auth`, require('./routes/authRoutes'));
app.use(`${API_URL}/animals`, require('./routes/animalRoutes'));
app.use(`${API_URL}/habitats`, require('./routes/habitatRoutes'));
app.use(`${API_URL}/services`, require('./routes/serviceRoutes'));
app.use(`${API_URL}/reviews`, require('./routes/reviewRoutes'));
app.use(`${API_URL}/foodrecord`, require('./routes/foodrecordRoutes'));
app.use(`${API_URL}/vetreport`, require('./routes/vetreportRoutes'));
app.use(`${API_URL}/stat`, require('./routes/animalstatsRoutes'));
app.use(`${API_URL}/contact`, require('./routes/ContactRoutes'));


module.exports = app;
