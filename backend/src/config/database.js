// backend/src/config/database.js

const mongoose = require('mongoose');

const connectDB = async () => {
 /* try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }*/
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected");
      } catch (err) {
        console.error("Error connecting to MongoDB", err);
      }
    };


module.exports = connectDB;