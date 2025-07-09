const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

// Register a new user
router.post('/add-user', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }
    // Auto-generate profile from email prefix
    const profile = email.split('@')[0];
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({ message: 'User already exists', profile: user.profile });
    }
    user = new User({ name, email, profile });
    await user.save();
    res.status(201).json({ message: 'User registered', profile: user.profile });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch user by profile
router.post('/user', async (req, res) => {
  try {
    const { profile } = req.body;
    const user = await User.findOne({ profile });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GitHub OAuth login
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth callback
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  // Successful authentication, redirect or respond
  res.redirect('/auth/github/success');
});

// Success route
router.get('/auth/github/success', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.json({ message: 'Logged out' });
    });
  });
});

// Leaderboard: Get all users sorted by createdAt (newest first)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 