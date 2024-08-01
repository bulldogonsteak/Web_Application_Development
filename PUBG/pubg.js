const fetchPlayerStats = async (playerName) => {
  try {
    const response = await fetch(`/api/pubg/player/${playerName}`);
    const data = await response.json();
    displayPlayerStats(data);
  } catch (error) {
    console.error('Error fetching player stats:', error);
  }
};

const displayPlayerStats = (data) => {
  const statsDiv = document.getElementById('playerStats');
  statsDiv.innerHTML = JSON.stringify(data, null, 2); // עדכני את זה כדי לעצב ולהציג את הנתונים כפי שנדרש
};

document.getElementById('fetchStats').addEventListener('click', () => {
  const playerName = document.getElementById('playerName').value;
  if (playerName) {
    fetchPlayerStats(playerName);
  }
});
