require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const urlRoutes = require('./routes/urlRoutes');
const app = express();

// Connect to database
connectDB("mongodb://localhost:27017/urlshortner")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', urlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;