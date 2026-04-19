const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());           // allows React to talk to this server
app.use(express.json());   // lets us read JSON request bodies

// Routes
const todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes);

// Ensure required env vars
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in environment. Check .env');
  process.exit(1);
}

// Debug info (temporary)
try {
  const nodeVersion = process.version;
  const mongooseVersion = mongoose.version || require('mongoose/package.json').version;
  const maskedUri = MONGO_URI.replace(/(\/\/)(.*?@)/, '$1*****@');
  console.log('Debug: Node', nodeVersion);
  console.log('Debug: mongoose', mongooseVersion);
  console.log('Debug: MONGO_URI', maskedUri);
} catch (e) {
  console.error('Debug logging failed', e);
}

// Connect to MongoDB then start server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected!');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });