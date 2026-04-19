require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI not set in .env');
  process.exit(1);
}

console.log('Attempting mongoose.connect with masked URI:', MONGO_URI.replace(/(\/\/)(.*?@)/, '$1*****@'));

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Test: MongoDB connected!');
    return mongoose.disconnect();
  })
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Test: MongoDB connection error (full):');
    console.error(err && err.stack ? err.stack : err);
    process.exit(1);
  });
