const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');


router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
});


router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ error: 'Email ou mot de passe incorrect' });
    }
    
    const isMatch = await bcrypt.compare(req.body.mot_de_passe, user.mot_de_passe);
    if (!isMatch) {
      return res.status(401).send({ error: 'Email ou mot de passe incorrect' });
    }
    
    const token = user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get('/profil', auth, async (req, res) => {
  res.send(req.user);
});


router.get('/validate-token', auth, async (req, res) => {
  res.send({ valid: true, user: req.user });
});

module.exports = router;