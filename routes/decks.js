const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Get all decks with their cards
router.get('/', (req, res) => {
  const userId = req.query.user_id;
  if (!userId) return res.status(400).json({ error: 'Missing user_id' });

  db.query('SELECT * FROM decks WHERE user_id = ?', [userId], (err, decks) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch decks' });

    const deckIds = decks.map(d => d.deck_id);
    if (deckIds.length === 0) return res.json([]);

    db.query('SELECT * FROM cards WHERE id_deck IN (?)', [deckIds], (err, cards) => {
  if (err) return res.status(500).json({ error: 'Failed to fetch cards' });

  // Convert image BLOB to base64 string for each card
  cards.forEach(card => {
    if (card.image) {
      card.imageBase64 = card.image.toString('base64');
    } else {
      card.imageBase64 = null;
    }
  });

  const decksWithCards = decks.map(deck => ({
  title: deck.name,
  deck_id: deck.deck_id,
  flashcards: cards
    .filter(card => card.id_deck === deck.deck_id)
    .map(card => ({
      id: card.id, // <-- Make sure this is included!
      question: card.question,
      answer: card.answer,
      image: card.image,
      imageBase64: card.imageBase64,
      // ...other fields
    })),
  }));

  res.json(decksWithCards);
});
  });
});

router.post('/', (req, res) => {
  const { name, timer, user_id } = req.body;
  if (!name || !timer || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  db.query(
    'INSERT INTO decks (name, timer, user_id) VALUES (?, ?, ?)',
    [name, timer, user_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to create deck' });
      // Return the new deck_id so Flutter can use it for cards
      res.json({ deck_id: result.insertId });
    }
  );
});

router.delete('/:id', (req, res) => {
  const deckId = req.params.id;
  // Delete all cards with this deck id first
  db.query('DELETE FROM cards WHERE id_deck = ?', [deckId], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to delete cards' });
    // Then delete the deck itself
    db.query('DELETE FROM decks WHERE deck_id = ?', [deckId], (err2) => {
      if (err2) return res.status(500).json({ error: 'Failed to delete deck' });
      res.json({ success: true });
    });
  });
});
module.exports = router;