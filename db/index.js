const mongoose = require('mongoose');

require('dotenv').config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Successfully Connected to MongoDB ...");
  } catch (error) {
    console.error('ERROR: in MongoDB connection', error.message);
  }  
}

connect();

module.exports = mongoose.connection;