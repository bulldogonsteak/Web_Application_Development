document.getElementById('player-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const playerName = document.getElementById('playerName').value;

  try {
    const response = await fetch(`/api/pubg/player/${playerName}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();
    displayPlayerProfile(data);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
});

function displayPlayerProfile(data) {
  const playerProfile = document.getElementById('player-profile');
  const player = data.data[0];

  document.getElementById('player-name').textContent = player.attributes.name;

  // Extract wins and other stats from the player data
  const stats = player.attributes.stats; // Adjust this line based on the actual response
  const totalMatches = stats.totalMatchesPlayed || 0; // Replace with the correct path
  const wins = stats.wins || 0; // Replace with the correct path
  const kills = stats.kills || 0; // Replace with the correct path

  document.getElementById('total-matches').textContent = totalMatches;
  document.getElementById('wins').textContent = wins;
  document.getElementById('kills').textContent = kills;

  playerProfile.style.display = 'block';
}
