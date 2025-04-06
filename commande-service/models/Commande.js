const mongoose = require('mongoose');

const produitCommandeSchema = new mongoose.Schema({
  produit_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  quantite: {
    type: Number,
    required: true,
    min: 1
  }
});

const commandeSchema = new mongoose.Schema({
  produits: [produitCommandeSchema],
  client_id: {
    type: String,
    required: true
  },
  prix_total: {
    type: Number,
    required: true,
    min: 0
  },
  statut: {
    type: String,
    enum: ['En attente', 'Confirmée', 'Expédiée'],
    default: 'En attente'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Commande', commandeSchema);