const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const Profile = require('../models/Profile');

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists with this Google ID
    let user = await User.findOne({ googleId: profile.id });
    
    if (user) {
      return done(null, user);
    }
    
    // Check if user exists with same email
    user = await User.findOne({ email: profile.emails[0].value });
    
    if (user) {
      // Link Google account to existing user
      user.googleId = profile.id;
      user.provider = 'google';
      await user.save();
      return done(null, user);
    }
    
    // Create new user
    user = new User({
      name: profile.displayName,
      email: profile.emails[0].value,
      googleId: profile.id,
      provider: 'google',
      avatar: profile.photos[0]?.value || 'profile.png'
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
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// JWT Strategy for protecting routes
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'defaultsecret'
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.userId);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;