const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Create a new card
router.post('/', (req, res) => {
  const { question, answer, id_deck, name, image, id_user } = req.body; // Add image
  // Decode base64 image if provided, else set to null
  let imageBuffer = null;
  if (image) {
    imageBuffer = Buffer.from(image, 'base64');
  }
  db.query(
    'INSERT INTO cards (question, answer, id_deck, name, image, id_user) VALUES (?, ?, ?, ?, ?, ?)',
    [question, answer, id_deck || null, name, imageBuffer, id_user],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to create card' });
      res.json({ success: true, cardId: result.insertId });
    }
  );
});

router.get('/loose', (req, res) => {
  const userId = req.query.user_id;
  if (!userId) return res.status(400).json({ error: 'Missing user_id' });

  db.query(
    'SELECT * FROM cards WHERE (id_deck IS NULL OR id_deck = 0) AND id_user = ?',
    [userId],
    (err, cards) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch loose cards' });
      // Optionally add imageBase64 here if you want to display images
      cards.forEach(card => {
        if (card.image) {
          card.imageBase64 = card.image.toString('base64');
        }
      });
      res.json(cards);
    }
  );
});

router.delete('/:id', (req, res) => {
  const cardId = req.params.id;
  db.query('DELETE FROM cards WHERE id = ?', [cardId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to delete card' });
    res.json({ success: true });
  });
});

router.put('/:id', (req, res) => {
  const cardId = req.params.id;
  const { question, answer } = req.body;
  db.query(
    'UPDATE cards SET question = ?, answer = ? WHERE id = ?',
    [question, answer, cardId],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to update card' });
      res.json({ success: true });
    }
  );
});

module.exports = router;