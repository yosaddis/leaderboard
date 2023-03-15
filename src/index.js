import Players from './modules/player.js';
import './style.css';

const form = document.querySelector('.form-input');
const [playerNameInput, playerScoreInput] = form.elements;
const playersObj = new Players();

if (localStorage.PlayersDB) {
  playersObj.players = JSON.parse(localStorage.getItem('PlayersDB'));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newPlayer = {
    playerName: playerNameInput.value,
    playerScore: playerScoreInput.value,
  };
  playersObj.addPlayer(newPlayer);
  playerNameInput.value = '';
  playerScoreInput.value = '';
});

playersObj.showPlayers();
playersObj.populateFields();
