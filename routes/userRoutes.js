const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

// GET /users/profile - Retrieve logged-in user's profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /users/profile - Update user's profile
router.put('/profile', authMiddleware, async (req, res) => {
    try {
        const { username, email } = req.body;
        const updates = {};
        if (username) updates.username = username;
        if (email) updates.email = email;

        const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true, select: '-password' });
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
