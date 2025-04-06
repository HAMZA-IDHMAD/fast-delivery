const express = require('express');
const router = express.Router();
const Livraison = require('../models/Livraison');
const axios = require('axios');
const { authenticate, checkRole } = require('../middleware/authMiddleware');


router.post('/ajouter', authenticate, checkRole('admin'), async (req, res) => {
  try {
   
    await axios.get(`http://localhost:3002/commande/${req.body.commande_id}`, {
      headers: {
        Authorization: req.header('Authorization')
      }
    });
    
    const livraison = new Livraison(req.body);
    await livraison.save();
    res.status(201).send(livraison);
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).send({ error: 'Commande non trouvée' });
    }
    res.status(400).send(error);
  }
});


router.put('/:id', authenticate, async (req, res) => {
  try {
    
    const livraison = await Livraison.findById(req.params.id);
    
    if (!livraison) {
      return res.status(404).send();
    }
    
    if (livraison.transporteur_id !== req.user._id && req.user.role !== 'admin') {
      return res.status(403).send({ error: 'Not authorized to update this delivery' });
    }

    const updatedLivraison = await Livraison.findByIdAndUpdate(
      req.params.id,
      { statut: req.body.statut },
      
    );
    
    res.send(updatedLivraison);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;