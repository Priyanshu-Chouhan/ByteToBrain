const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: { type: String },
  reference: { type: String },
  avatar: { type: String, default: 'profile.png' },
  googleId: { type: String },
  provider: { type: String, enum: ['local', 'google'], default: 'local' },
}, {
  timestamps: true
});

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

module.exports = mongoose.models.User || mongoose.model('User', userSchema); 