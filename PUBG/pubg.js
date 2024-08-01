const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3000;
const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhMmVjMjFiMC0zMjExLTAxM2QtOWU3Yy0zYTQyODlkMDMzMDgiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzIyNTAyNDkwLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImNvbnNvbGVjYXN0bGUifQ.HSktfr5-vJCQqNe_0imkSZI8kCfKdzYnRadGUf27U9k';


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', async (req, res) => {
  const playerName = 'sample_player';
  const url = `https://api.pubg.com/shards/pc-na/players?filter[playerNames]=${playerName}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/vnd.api+json'
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    res.render('index', { data });
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    res.render('index', { data: null, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
