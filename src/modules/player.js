const playersList = document.querySelector('.list-players');

const Players = class {
  constructor(playerName, playerScore) {
    this.playerName = playerName;
    this.playerScore = playerScore;
    this.players = [];
  }

  populateFields = () => {
    localStorage.setItem('PlayersDB', JSON.stringify(this.players));
  };

  showPlayers = () => {
    playersList.innerHTML = '';
    if (this.players.length > 0) {
      this.players.map((player) => {
        const row = document.createElement('tr');
        const rowData = document.createElement('td');

        rowData.textContent = `${player.playerName}: ${player.playerScore}`;

        row.classList.add('player-container');
        row.appendChild(rowData);

        playersList.appendChild(row);
        return playersList;
      });
    } else {
      const playerDiv = document.createElement('tr');
      const elementPlayer = document.createElement('td');
      elementPlayer.textContent = 'Add new player';
      playerDiv.classList.add('player-container');
      playerDiv.appendChild(elementPlayer);
      playersList.appendChild(playerDiv);
    }
  };

  addPlayer = (player) => {
    this.players.push(player);
    this.populateFields();
    this.showPlayers();
  }

  removePlayer(player) {
    const result = this.players.filter((b) => b !== player);
    this.players = result;
    this.populateFields();
  }
};

export default Players;