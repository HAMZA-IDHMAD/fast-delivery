const express = require('express');
const mongoose = require('mongoose');
const livraisonRoutes = require('./routes/livraisonRoutes');

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json());

// Routes
app.use('/livraison', livraisonRoutes);

// Database connection
mongoose.connect('mongodb://localhost:27017/livraison-service', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB (Livraison Service)'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Livraison Service running on port ${PORT}`);
});