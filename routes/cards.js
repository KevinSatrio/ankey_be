const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Create a new card
router.post('/', (req, res) => {
  const { question, answer, id_deck } = req.body;
  db.query(
    'INSERT INTO cards (question, answer, id_deck) VALUES (?, ?, ?)',
    [question, answer, id_deck || null],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to create card' });
      res.json({ success: true, cardId: result.insertId });
    }
  );
});

module.exports = router;