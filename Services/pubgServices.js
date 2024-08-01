const axios = require('axios');

const pubgApiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhMmVjMjFiMC0zMjExLTAxM2QtOWU3Yy0zYTQyODlkMDMzMDgiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzIyNTAyNDkwLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImNvbnNvbGVjYXN0bGUifQ.HSktfr5-vJCQqNe_0imkSZI8kCfKdzYnRadGUf27U9k'; 
const pubgApiUrl = 'https://api.pubg.com'; // כתובת הבסיס ל-PUBG API

const getPlayerStats = async (playerName) => {
  try {
    const response = await axios.get(`${pubgApiUrl}/shards/pc/players?filter[playerNames]=${playerName}`, {
      headers: {
        Authorization: `Bearer ${pubgApiKey}`,
        Accept: 'application/vnd.api+json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching player stats:', error);
    throw error;
  }
};

module.exports = {
  getPlayerStats,
};
