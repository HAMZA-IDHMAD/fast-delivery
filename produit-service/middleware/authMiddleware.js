const axios = require('axios');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).send({ error: 'Authentication required' });
    }

    const response = await axios.get('http://localhost:3004/auth/validate-token', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.data.valid) {
      throw new Error('Invalid token');
    }

    req.user = response.data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res.status(403).send({ error: 'Insufficient permissions' });
    }
    next();
  };
};

module.exports = { authenticate, checkRole };