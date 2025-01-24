const express = require('express');
const app = express();
const cors = require('cors');
// const path = require('path');
require('dotenv/config');

const upload = require('./config/multer');

// app.use(cors());
// app.options('*', cors())

const allowedOrigins = [
    'https://zoo-rouge.vercel.app',
   
  ];

 
  
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true); // Allow the request
        } else {
          callback(new Error('Not allowed by CORS')); 
        }
      },
    })
  );

// Middleware
app.use(express.json());

// Load base API URL from the .env file or default to '/api/v1'
const API_URL = process.env.API_URL || '/api/v1';
console.log(`API routes base URL: ${API_URL}`);


app.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded!' });
    }

    // File uploaded successfully
    res.status(200).json({
      message: 'File uploaded successfully!',
      url: req.file.path, // Cloudinary URL for the uploaded image
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
