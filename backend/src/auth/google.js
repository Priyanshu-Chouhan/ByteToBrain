const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const Profile = require('../models/Profile');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ 
        $or: [{ googleId: profile.id }, { email: profile.emails[0].value }]
      });
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          password: 'google-oauth'
        });
        
        // Create profile for Google user
        const profileDoc = new Profile({
          userId: user._id,
          name: user.name,
          email: user.email,
          password: 'google-oauth',
          avatar: 'profile.png',
        });
        await profileDoc.save();
      } else if (!user.googleId) {
        user.googleId = profile.id;
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}); 
