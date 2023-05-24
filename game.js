document.addEventListener('DOMContentLoaded', () => {
  const dino = document.querySelector('.dino');
  const block = document.querySelector('.obstacle');
  let bottom = 0;
  let gravity = 0.9;
  let isJumping = false;
  let isGameOver = false;
  function jump() {
    if (isJumping) {
      return;
    }
    let timerUpId = setInterval(function () {

      if (bottom > 250) {
        clearInterval(timerUpId);
        let timerDownId = setInterval(function () {
          if (bottom < 0) {
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

  
}); 