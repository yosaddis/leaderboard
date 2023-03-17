import Players from './modules/player.js';
import './style.css';

const form = document.querySelector('.form-input');
const [playerNameInput, playerScoreInput] = form.elements;
const refreshBtn = document.querySelector('.refresh');
const statusResponse = document.querySelector('.status-response');
const playersObj = new Players();

if (localStorage.PlayersDB) {
  // playersObj.players = JSON.parse(localStorage.getItem('PlayersDB'));
}

const getNewGameId = async () => {
  const response = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/',
    {
      method: 'POST',
      body: JSON.stringify({
        name: "jo's game",
      }),
      headers: {
        'Content-type': 'application/json',
      },
    },
  );
  const keyObject = await response.json();
  return keyObject.result.slice(14, 34);
};

const gameKey = getNewGameId();

const getAPI = async () => {
  const response = await fetch(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameKey}/scores`,
  );
  const data = await response.json();
  playersObj.players = data.result;
  playersObj.showPlayers();
  return data.result;
};

const savePlayer = async (player) => {
  const response = await fetch(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameKey}/scores`,
    {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(player),
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await response.json();
  return data.result;
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newPlayer = {
    user: playerNameInput.value,
    score: playerScoreInput.value,
  };
  statusResponse.textContent = await savePlayer(newPlayer);
  playersObj.addPlayer(newPlayer);
  playerNameInput.value = '';
  playerScoreInput.value = '';
  playersObj.showPlayers();
  playersObj.populateFields();

  setTimeout(() => {
    statusResponse.textContent = '';
  }, 5000);
});

refreshBtn.addEventListener('click', getAPI);
playersObj.showPlayers();
playersObj.populateFields();
