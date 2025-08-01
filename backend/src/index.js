require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const session = require('express-session');
require('./auth/google');
const Profile = require('./models/Profile');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/avatars', express.static(path.join(__dirname, '../public/avatars')));

// Project routes
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));

// Example route
app.get('/', (req, res) => {
  res.send('ByteToBrain Backend API');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  async (req, res) => {
    const user = req.user;
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // Get or create profile
    let profile = await Profile.findOne({ userId: user._id });
    if (!profile) {
      profile = new Profile({
        userId: user._id,
        name: user.name,
        email: user.email,
        password: 'google-oauth',
        avatar: 'profile.png',
      });
      await profile.save();
    }
    
    res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  }
);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
}); 
