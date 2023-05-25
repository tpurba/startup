document.addEventListener('DOMContentLoaded', () => {
  const dino = document.querySelector('.dino');
  const cactus = document.querySelector('.obstacle');
  const grid = document.querySelector('.grid');
  let bottom = 0;
  let gravity = 0.9;
  let isJumping = false;
  let isGameOver = false;
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

  function generateSquare() {
    let randomTime = Math.random() * 4000;
    let squarePosition = 1000;
    const square = document.createElement('div');
    if(!isGameOver){
      square.classList.add('boxbox');
    }
    grid.appendChild(square);
    square.style.left = squarePosition + 'px';
    let timerId = setInterval(function () {
      if(squarePosition > 0 && squarePosition < 60 && bottom < 80){
        clearInterval(timerId);
        alert("Game Over");
        isGameOver = true;
        //remove all the children 
        while(grid.firstChild){
          grid.removeChild(grid.lastChild);
        }
      }
      if(squarePosition < 0 && grid.contains(square)){
        grid.removeChild(square);
      }
      squarePosition -= 10;
      square.style.left = squarePosition + 'px';
      
    }, 20)
    if(!isGameOver) {
      setTimeout(generateSquare, randomTime);
    }
  }
  generateSquare();

  let isAlive = setInterval(function () {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    //console.log(dinoTop);
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    //console.log(cactusLeft);
    //cactus exists between -22 and 27 and dinotop is above 600 or equal 
    if ((cactusLeft < 27) && (cactusLeft > -22) && dinoTop >= 600) {
      //alert("Game over");

    }


  }, 10);

}); 