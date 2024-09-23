require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./user');

const router = express.Router();

// Sync the database
User.sync()
  .then(() => {
    console.log('User table created or exists.');
  })
  .catch((error) => {
    console.error('Error creating User table:', error);
  });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
