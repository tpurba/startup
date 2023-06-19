document.addEventListener('DOMContentLoaded', () => {
  const dino = document.querySelector('.dino');
  const cactus = document.querySelector('.cactus');
  const grid = document.querySelector('.grid');
  const scoreDisplay = document.querySelector('.score');
  const playerName = document.querySelector('.player-name');
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  let bottom = 0;
  let gravity = 0.9;
  let score = 0;
  let isJumping = false;
  let isGameOver = false;
  const GameEndEvent = 'gameEnd';
  const GameStartEvent = 'gameStart';
  cactus.style.animation = 'none'; //before game have cactus animations stopped 
  document.addEventListener("keydown", handleStart, { once: true });
  //congfigure websocket here 
  configureWebSocket();
  function getPlayerName() {
    if (localStorage.getItem('userName') === '') {
      return 'MysteryPlayer';
    }
    else {
      return localStorage.getItem('userName');
    }
  }
  //set player name 
  const playerNameEl = document.querySelector('.player-name');
  playerNameEl.textContent = getPlayerName();

  //websocket functions 
  function configureWebSocket() {
    socket.onopen = (event) => {
      console.log("in open ws");
      displayMsg('system', 'game', 'connected');
    };
    socket.onclose = (event) => {
      console.log("in close ws");
      displayMsg('system', 'game', 'disconnected');
    };
    socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      if (msg.type === GameEndEvent) {
        displayMsg('player', msg.from, `scored ${msg.value.score}`);
      } else if (msg.type === GameStartEvent) {
        displayMsg('player', msg.from, `started a new game`);
      }
    };
  }

  function displayMsg(cls, from, msg) {
    const chatText = document.querySelector('#player-messages');
    chatText.innerHTML =
      `<div class="event"><span class="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
  }

  function broadcastEvent(from, type, value) {
    const event = {
      from: from,
      type: type,
      value: value,
    };
    console.log(event);
    socket.send(JSON.stringify(event));
  }
  //websocket functions 

  //begin game 
  function handleStart() {
    //socket.onopen;
    // Let other players know a new game has started
    broadcastEvent(getPlayerName(), GameStartEvent, {});
    cactus.style.animation = 'block 1.3s linear infinite'; //start cactus animations 

    function jump() {
      if (isJumping) {
        return;
      }
      let timerUpId = setInterval(function () {

        if (bottom > 170) {
          clearInterval(timerUpId);
          let timerDownId = setInterval(function () {
            if (bottom < 10) {
              clearInterval(timerDownId);
              isJumping = false;
            }
            bottom -= 5;
            bottom = bottom;
            dino.style.bottom = bottom + 'px';
          }, 20);
        }
        isJumping = true;
        bottom += 30;
        bottom = bottom * gravity;
        dino.style.bottom = bottom + 'px';
      }, 20);

    }
    function control(e) {
      //space bar
      if (e.keyCode === 32) {
        jump();
      }
    }
    //if key is pressed it goes to control function 
    document.addEventListener('keydown', control);
    //counts score 
    let timerIdSocre = setInterval(function () {
      if (!isGameOver) {
        score += 1;
        scoreDisplay.textContent = Math.floor(score);
      }
    }, 20)

    function checkCollision(object1, object2) {
      var rect1 = object1.getBoundingClientRect();
      var rect2 = object2.getBoundingClientRect();

      // Check for collision
      return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
      );
    }

    let isAlive = setInterval(function () {
      var isCollision = checkCollision(dino, cactus);
      if (isCollision) {
        clearInterval();
        alert("Game Over! \n Score:" + score);
        //store the score and the players userName together for database 
        saveScore(score);
        score = 0;
        window.location.href = 'scoreBoard.html';
      }

    }, 10);

    //access database 
    async function saveScore(score) {
      //get the variables needed for score 
      const userName = getPlayerName();
      const date = new Date().toLocaleDateString();
      //create the variable new score 
      const newScore = { name: userName, score: score, date: date };
      //get the high score array from the database 
      try {
        //Post the scores send score to the server
        const response = await fetch('/api/score', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(newScore),
        });
        // Let other players know the game has concluded
        broadcastEvent(getPlayerName(), GameEndEvent, newScore);
        const scores = await response.json();//use response of json to make the scores array

        localStorage.setItem('scores', JSON.stringify(scores));// store locally as well
      } catch {
        // If there was an error then just track scores locally
        updateScoresLocal(newScore);
        //console.log("Error occured saving score to local")
      }
    }

    function updateScoresLocal(newScore) {
      console.log("Updating local storage data");
      let scores = [];
      const scoresText = localStorage.getItem('scores');
      if (scoresText) {
        scores = JSON.parse(scoresText);
      }

      let found = false;
      for (const [i, prevScore] of scores.entries()) {
        if (newScore > prevScore.score) {
          scores.splice(i, 0, newScore);
          found = true;
          break;
        }
      }

      if (!found) {
        scores.push(newScore);
      }

      if (scores.length > 10) {
        scores.length = 10;
      }

      localStorage.setItem('scores', JSON.stringify(scores));
    }

    // Functionality for peer communication using WebSocket
  }



}); 
