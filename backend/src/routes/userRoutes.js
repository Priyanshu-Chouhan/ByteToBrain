const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../utils/authMiddleware');
const fs = require('fs');

// Multer setup for avatar uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/avatars'));
  },
  filename: function (req, file, cb) {
    // Save as userId-originalname for uniqueness and real name
    cb(null, req.userId + '-' + file.originalname);
  }
});
const upload = multer({ storage });

const avatarsPath = path.join(__dirname, '../../public/avatars');
if (!fs.existsSync(avatarsPath)) {
  fs.mkdirSync(avatarsPath, { recursive: true });
}

router.post('/register', userController.register);
router.post('/login', userController.login);

// Profile routes (require auth)
router.get('/profile', authMiddleware, userController.getProfile);
router.post('/profile/avatar', authMiddleware, upload.single('avatar'), userController.uploadAvatar);
router.delete('/profile/avatar', authMiddleware, userController.removeAvatar);
router.put('/profile', authMiddleware, userController.updateProfile);
router.get('/profile-details', authMiddleware, async (req, res) => {
  const Profile = require('../models/Profile');
  const profile = await Profile.findOne({ userId: req.userId });
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  res.json({ profile });
});

module.exports = router; 