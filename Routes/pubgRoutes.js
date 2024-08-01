const express = require('express');
const router = express.Router();
const pubgService = require('../services/pubgService');

router.get('/player/:name', async (req, res) => {
  try {
    const playerName = req.params.name;
    const playerStats = await pubgService.getPlayerStats(playerName);
    res.json(playerStats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch player stats' });
  }
});

module.exports = router;
