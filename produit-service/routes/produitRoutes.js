const express = require('express');
const router = express.Router();
const Produit = require('../models/Produit');
const { authenticate, checkRole } = require('../middleware/authMiddleware');


router.post('/ajouter', authenticate, checkRole('admin'), async (req, res) => {
  try {
    const produit = new Produit(req.body);
    await produit.save();
    res.status(201).send(produit);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get('/:id', authenticate, async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) {
      return res.status(404).send();
    }
    res.send(produit);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.patch('/:id/stock', authenticate, checkRole('admin'), async (req, res) => {
  try {
    const produit = await Produit.findByIdAndUpdate(
      req.params.id,
      { stock: req.body.stock }
    );
    if (!produit) {
      return res.status(404).send();
    }
    res.send(produit);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;