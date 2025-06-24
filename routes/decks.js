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

      const decksWithCards = decks.map(deck => ({
        title: deck.name,
        deck_id: deck.deck_id,
        flashcards: cards
          .filter(card => card.id_deck === deck.deck_id)
          .map(card => ({
            question: card.question,
            answer: card.answer,
            image: card.image,
          })),
      }));

      res.json(decksWithCards);
    });
  });
});
module.exports = router;