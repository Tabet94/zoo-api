require('dotenv').config(); // Load environment variables from .env file
const app = require('./app');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;


// Start the server
app.listen(PORT, () => {
  
});
