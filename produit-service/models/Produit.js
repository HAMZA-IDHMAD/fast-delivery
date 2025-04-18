const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  prix: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true 
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Produit', produitSchema);