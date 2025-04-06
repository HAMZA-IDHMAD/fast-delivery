const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mot_de_passe: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'customer', 'delivery_person'],
    default: 'customer'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('mot_de_passe')) {
    this.mot_de_passe = await bcrypt.hash(this.mot_de_passe, 8);
  }
  next();
});

// Generate auth token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ 
    _id: this._id, 
    role: this.role 
  }, process.env.JWT_SECRET || 'secretkey', {
    expiresIn: '1h'
  });
};

module.exports = mongoose.model('User', userSchema);