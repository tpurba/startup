import React, { useState, useEffect } from 'react';

const Game = () => {
  const [bottom, setBottom] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const jump = () => {
    if (isJumping) {
      return;
    }
    let timerUpId = setInterval(() => {
      if (bottom > 170) {
        clearInterval(timerUpId);
        let timerDownId = setInterval(() => {
          if (bottom < 10) {
            clearInterval(timerDownId);
            setIsJumping(false);
          }
          setBottom((prevBottom) => prevBottom - 5);
        }, 20);
      }
      setIsJumping(true);
      setBottom((prevBottom) => prevBottom + 30);
    }, 20);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      jump();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    let timerIdScore = setInterval(() => {
      if (!isGameOver) {
        setScore((prevScore) => prevScore + 1);
      }
    }, 20);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(timerIdScore);
    };
  }, [isGameOver]);

  return (
    <div>
      {/* JSX code for rendering the game and score display */}
      {/* Use state values like `bottom`, `score`, `isGameOver`, etc. in your JSX */}
    </div>
  );
};

export default Game;