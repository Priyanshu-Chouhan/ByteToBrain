require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/avatars', express.static(path.join(__dirname, '../public/avatars')));

// Project routes
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));

// Example route
app.get('/', (req, res) => {
  res.send('ByteToBrain Backend API');
});

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