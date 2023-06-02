
document.addEventListener('DOMContentLoaded', () => {
  const dino = document.querySelector('.dino');
  const cactus = document.querySelector('.obstacle');
  const grid = document.querySelector('.grid');
  const scoreDisplay = document.querySelector('.score');
  const playerName = document.querySelector('.player-name');
  let bottom = 0;
  let gravity = 0.9;
  let score = 0;
  let isJumping = false;
  let isGameOver = false;


  function getPlayerName() {
    if (localStorage.getItem('userName') === '') {
      return 'MysteryPlayer';
    }
    else {
      return localStorage.getItem('userName');
    }
  }

  const playerNameEl = document.querySelector('.player-name');
  console.log("before get playerName");
  playerNameEl.textContent = getPlayerName();
  console.log("after get playerName");
  function jump() {
    if (isJumping) {
      return;
    }
    let timerUpId = setInterval(function () {

      if (bottom > 170) {
        clearInterval(timerUpId);
        let timerDownId = setInterval(function () {
          if (bottom < 50) {
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
      alert("Game Over \n Refresh the page to try again! \n Score:" + score);
      //store the score and the players userName together for database 
      console.log("GameOver");
      saveScore(score);
      score = 0;
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
      const response = await fetch('/sb/score', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newScore),
      });

       
      const scores = await response.json();//use response of json to make the scores array

      localStorage.setItem('scores', JSON.stringify(scores));// store locally as well
    } catch {
      // If there was an error then just track scores locally
      this.updateScoresLocal(newScore);
    }
  }

  function updateScoresLocal(newScore) {
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

  //temporary that mimicks WebSocket 
  setInterval(() => {
    const score = Math.floor(Math.random() * 3000);
    const chatText = document.querySelector('#player-messages');
    chatText.innerHTML =
      `<div class="event"><span class="player-event">Bint</span> scored ${score}</div>` + chatText.innerHTML;
  }, 5000);
  // websocket function 
  // Have it be a setinterval that will update the list every 20 miliseconds 
  // access it websocket and get data 
  // have the websocket id ready for use 
  // add on to the websocket parent class using div 




}); 