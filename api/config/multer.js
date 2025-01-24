const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dqfedwayp',  // Replace with your Cloudinary cloud name
  api_key: process.env.API_KEY, // Cloudinary API key (stored in environment variables)
  api_secret: process.env.API_SECRET // Cloudinary API secret (stored in environment variables)
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'zoo_images',           // Folder name in your Cloudinary account
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file formats
  },
});

// Configure multer to use Cloudinary storage
const upload = multer({ storage });

module.exports = upload; // Export the multer instance
