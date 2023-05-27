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
    return localStorage.getItem('userName') ?? 'Mystery player';
  }
  const playerNameEl = document.querySelector('.player-name');
  playerNameEl.textContent = getPlayerName();

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

  // function generateSquare() {
  //   let randomTime = Math.random() * 4000;
  //   let squarePosition = 1000;
  //   const square = document.createElement('div');
  //   square.appendChild(imageElement);
  //   if (!isGameOver) {
  //     square.classList.add('boxbox');
  //   }
  //   grid.appendChild(square);
  //   square.style.left = squarePosition + 'px';
  //   let timerId = setInterval(function () {
  //     if (squarePosition > 0 && squarePosition < 60 && bottom < 80) {
  //       clearInterval(timerId);
  //       alert("Game Over \n Refresh the page to try again! \n Score: " + score);
  //       //remove all the children 
  //       while (grid.firstChild) {
  //         grid.removeChild(grid.lastChild);
  //       }
  //       isGameOver = false; // change back to true
  //     }
  //     if (squarePosition < 0 && grid.contains(square)) {
  //       grid.removeChild(square);
  //     }
  //     squarePosition -= 10;
  //     square.style.left = squarePosition + 'px';

  //   }, 20)
  //   if (!isGameOver) {
  //     setTimeout(generateSquare, randomTime);
  //   }
  // }
  // generateSquare();
  let timerIdSocre = setInterval(function (){
    if(!isGameOver){
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
      alert("Game Over \n Refresh the page to try again! \n Score:" + score);
      //store the score and the players userName together for database 
      addResult(score, playerNameEl.textContent);
      score = 0;
    }

  }, 10);

  //access database 
  function addResult(score, userName){
    //add to the database the score 
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