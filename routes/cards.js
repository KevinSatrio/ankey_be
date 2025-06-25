const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Create a new card
router.post('/', (req, res) => {
  const { question, answer, id_deck, name, image } = req.body; // Add image
  // Decode base64 image if provided, else set to null
  let imageBuffer = null;
  if (image) {
    imageBuffer = Buffer.from(image, 'base64');
  }
  db.query(
    'INSERT INTO cards (question, answer, id_deck, name, image) VALUES (?, ?, ?, ?, ?)',
    [question, answer, id_deck || null, name, imageBuffer],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to create card' });
      res.json({ success: true, cardId: result.insertId });
    }
  );
});

module.exports = router;