const express = require('express');
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const Profile = require('../models/Profile');
const router = express.Router();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google OAuth login
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback
router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  (req, res) => {
    try {
      // Generate JWT token
      const token = jwt.sign(
        { userId: req.user._id, email: req.user.email },
        process.env.JWT_SECRET || 'defaultsecret',
        { expiresIn: '7d' }
      );

      // Redirect to frontend with token
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        reference: req.user.reference,
        avatar: req.user.avatar
      }))}`);
    } catch (error) {
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=auth_failed`);
    }
  }
);

// Google OAuth success endpoint for AJAX calls
router.get('/google/success', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    success: true,
    user: {
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      reference: req.user.reference,
      avatar: req.user.avatar
    }
  });
});

// Verify Google credential (for frontend GoogleLogin component)
router.post('/google/verify', async (req, res) => {
  try {
    const { credential } = req.body;
    
    if (!credential) {
      return res.status(400).json({ error: 'Credential is required' });
    }

    // Verify the credential with Google
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).json({ error: 'Invalid credential' });
    }

    const { sub: googleId, email, name, picture } = payload;

    // Check if user already exists with this Google ID
    let user = await User.findOne({ googleId });
    
    if (user) {
      // User exists, generate token and return
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET || 'defaultsecret',
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        token,
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          reference: user.reference,
          avatar: user.avatar
        }
      });
    }
    
    // Check if user exists with same email
    user = await User.findOne({ email });
    
    if (user) {
      // Link Google account to existing user
      user.googleId = googleId;
      user.provider = 'google';
      if (picture) user.avatar = picture;
      await user.save();

      // Update profile as well
      const profile = await Profile.findOne({ userId: user._id });
      if (profile) {
        profile.avatar = user.avatar;
        await profile.save();
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET || 'defaultsecret',
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        token,
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          reference: user.reference,
          avatar: user.avatar
        }
      });
    }
    
    // Create new user
    user = new User({
      name,
      email,
      googleId,
      provider: 'google',
      avatar: picture || 'profile.png'
    });
    
    await user.save();
    
    // Create profile for the new user
    const userProfile = new Profile({
      userId: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
    
    await userProfile.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        reference: user.reference,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Google verification error:', error);
    res.status(400).json({ error: 'Invalid credential or verification failed' });
  }
});

module.exports = router;