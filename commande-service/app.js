const express = require('express');
const mongoose = require('mongoose');
const commandeRoutes = require('./routes/commandeRoutes');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());

// Routes
app.use('/commande', commandeRoutes);

// Database connection
mongoose.connect('mongodb://localhost:27017/commande-service', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB (Commande Service)'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Commande Service running on port ${PORT}`);
});