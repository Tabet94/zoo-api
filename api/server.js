require('dotenv').config(); // Load environment variables from .env file
const app = require('./app');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
console.log(`API base URL: ${process.env.API_URL}`);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Routes loaded and server is listening...');
});