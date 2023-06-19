import React, { useEffect } from 'react';
import './dinoGame.css';
import './jump.jsx';

export function DinoGame(props) {
    const userName = props.userName;
    const [isGameOver, setGameOver] = React.useState(false);
    let bottom = 0;
    let dino = null;
    let cactus = null;
    let scoreDisplay = null;
    let startScreen = null;
    const gravity = 0.9;
    let score = 0;
    let isJumping = false;
    useEffect(() => {
        dino = document.querySelector('.dino');
        cactus = document.querySelector('.cactus');
        scoreDisplay = document.querySelector('.score');
        startScreen = document.querySelector('.start-screen');
    },);
    document.addEventListener("keydown", handleStart, { once: true });
    //begin game 
  function handleStart() {
    startScreen.style.display = 'none';
    cactus.style.animation = 'block 1.3s linear infinite';
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
        //after game redirect to score
        window.location.href = '/score';
      }

    }, 10);
  }
  async function saveScore(score) {
    const date = new Date().toLocaleDateString();
    const newScore = { name: userName, score: score, date: date };

    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newScore),
      });

      // Let other players know the game has concluded
      GameNotifier.broadcastEvent(userName, GameEvent.End, newScore);

      // Store what the service gave us as the high scores
      const scores = await response.json();
      localStorage.setItem('scores', JSON.stringify(scores));
    } catch {
      // If there was an error then just track scores locally
      updateScoresLocal(newScore);
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
    return (
        <div className="world">
            <img src="../images/dino.png" className="dino" height="50" width="50" alt="dino"></img>
            <img src="../images/background.png" className="background" alt="purple hour"></img>
            <img src="../images/cactus.png" className="cactus" alt="cactus"></img>
            <div className = "start-screen"> Press Any Key To Start</div>
            <div className = "score">0</div>
            <img src="../images/ground.png" className="ground" alt="ground"></img>
            
        </div>
        
    );
}