const express = require('express');
const router = express.Router();
const Commande = require('../models/Commande');
const axios = require('axios');
const authenticate = require('../middleware/authMiddleware');


router.post('/ajouter', authenticate, async (req, res) => {
  try {
  
    let prixTotal = 0;
    const produitsVerifies = [];
    
    for (const item of req.body.produits) {
      const response = await axios.get(`http://localhost:3001/produit/${item.produit_id}`, {
        headers: {
          Authorization: req.header('Authorization')
        }
      });
      const produit = response.data;
      
      if (produit.stock < item.quantite) {
        return res.status(400).send({ error: `Stock insuffisant pour le produit ${produit.nom}` });
      }
      
      produitsVerifies.push({
        produit_id: item.produit_id,
        quantite: item.quantite
      });
      
      prixTotal += produit.prix * item.quantite;
    }
    

    const commande = new Commande({
      produits: produitsVerifies,
      client_id: req.user._id, 
      prix_total: prixTotal
    });
    
    await commande.save();
    
 
    for (const item of req.body.produits) {
      await axios.patch(`http://localhost:3001/produit/${item.produit_id}/stock`, {
        stock: item.quantite * -1 
      }, {
        headers: {
          Authorization: req.header('Authorization')
        }
      });
    }
    
    res.status(201).send(commande);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get('/:id', authenticate, async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);
    
    if (!commande || 
        (commande.client_id !== req.user._id && req.user.role !== 'admin')) {
      return res.status(404).send();
    }
    
    res.send(commande);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/:id/statut', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).send({ error: 'Admin access required' });
    }

    const commande = await Commande.findByIdAndUpdate(
      req.params.id,
      { statut: req.body.statut },
      { new: true, runValidators: true }
    );
    
    if (!commande) {
      return res.status(404).send();
    }
    
    res.send(commande);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;