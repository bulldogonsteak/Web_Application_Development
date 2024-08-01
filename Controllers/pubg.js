const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// Route to handle PUBG API request
router.get('/player/:name', async (req, res) => {
  const playerName = req.params.name;
  const apiKey = process.env.PUBG_API_KEY; // Store your API key in an environment variable

  try {
    const response = await fetch(`https://api.pubg.com/shards/steam/players?filter[playerNames]=${playerName}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/vnd.api+json'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: response.statusText });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
