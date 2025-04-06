const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).send({ error: 'Please authenticate' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    const user = await User.findById(decoded._id);
    
    if (!user) {
      throw new Error();
    }
    
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};