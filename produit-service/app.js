const express = require('express');
const mongoose = require('mongoose');
const produitRoutes = require('./routes/produitRoutes');
const { authenticate } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Routes
app.use('/produit', authenticate, produitRoutes);

// Database connection
mongoose.connect('mongodb://localhost:27017/produit-service', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB (Produit Service)'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Produit Service running on port ${PORT}`);
});