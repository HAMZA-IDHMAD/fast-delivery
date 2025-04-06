const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Database connection
mongoose.connect('mongodb://localhost:27017/auth-service', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB (Auth Service)'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});