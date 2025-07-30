const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const Profile = require('../models/Profile');

// Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, reference } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, phone, reference, avatar: 'profile.png' });
    await user.save();
    // Create profile with avatar as default
    const profile = new Profile({
      userId: user._id,
      name,
      email,
      password: hashedPassword,
      phone,
      reference,
      avatar: 'profile.png',
    });
    await profile.save();
    console.log('Profile created:', profile); // Debug log
    res.status(201).json({ message: 'User registered', user: { name, email, phone, reference, avatar: 'profile.png' }, profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '7d' }
    );
    
    // Get profile data
    const profile = await Profile.findOne({ userId: user._id });
    const userData = {
      name: profile?.name || user.name,
      email: profile?.email || user.email,
      phone: profile?.phone || user.phone,
      reference: profile?.reference || user.reference,
      avatar: profile?.avatar || user.avatar
    };
    
    res.json({ 
      message: 'Login successful', 
      token, 
      user: userData 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user profile (assume req.userId is set by auth middleware)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user profile (name, phone, reference)
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, reference } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.reference = reference || user.reference;
    await user.save();
    // Update profile as well
    const profile = await Profile.findOne({ userId: user._id });
    if (profile) {
      profile.name = user.name;
      profile.email = user.email;
      profile.password = user.password;
      profile.phone = user.phone;
      profile.reference = user.reference;
      await profile.save();
    }
    res.json({ user: { name: user.name, email: user.email, phone: user.phone, reference: user.reference, avatar: user.avatar }, profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Upload avatar
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    // Remove old avatar if exists
    if (user.avatar) {
      const oldPath = path.join(__dirname, '../../public/avatars', user.avatar);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    user.avatar = req.file.filename;
    await user.save();
    console.log('User avatar after upload:', user.avatar); // Debug log
    // Update profile avatar as well
    const Profile = require('../models/Profile');
    const profile = await Profile.findOne({ userId: user._id });
    if (profile) {
      profile.avatar = user.avatar;
      await profile.save();
      console.log('Profile avatar after upload:', profile.avatar); // Debug log
    } else {
      console.log('No profile found for user:', user._id);
    }
    res.json({ avatar: user.avatar });
  } catch (err) {
    console.error('Avatar upload error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Remove avatar
exports.removeAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.avatar && user.avatar !== 'profile.png') {
      const oldPath = path.join(__dirname, '../../public/avatars', user.avatar);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    user.avatar = 'profile.png';
    await user.save();
    // Update profile avatar as well
    const profile = await Profile.findOne({ userId: user._id });
    if (profile) {
      profile.avatar = 'profile.png';
      await profile.save();
    }
    res.json({ message: 'Avatar removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 
