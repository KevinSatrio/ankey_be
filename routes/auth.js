const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body; // Add email

  // Check if user exists
  db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], async (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ error: 'User or email already exists' });
    }

    // Hash password and insert
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword], // Correct order
      (err) => {
        if (err) return res.status(500).json({ error: 'Failed to register' });
        res.status(201).json({ success: true });
      }
    );
  });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (results.length === 0) return res.status(400).json({ error: 'User not found' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  });
});

module.exports = router;
