const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  reference: { type: String },
  avatar: { type: String, default: 'profile.png' },
});

module.exports = mongoose.models.Profile || mongoose.model('Profile', profileSchema); 