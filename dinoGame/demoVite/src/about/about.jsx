import React from 'react';
import './help.css';
export function About() {
  return (
    <div id="page-container">
      <div id="content-wrap">
        <main className='container'>
          <div className="content">
            <div className="picture">
              <img id="sunset" src="../images/sunSet.png" alt="sunSet"></img>
            </div>
            <h2 className="myheader">Introduction</h2>
            <p className="Introduction">
              Welcome to the runner game! Thank you for joining us and playing
              this wonderful game! This game was creted by members of the Chrome UX team in 2014
              and is not my game all credit goes to the individuals who made dino game one of the 
              greatest games ever.
            </p>
            <h2 className="subsection"> How to play</h2>
            <p className="HowToPlay">
              The game is very simple to play you run as a character on the screen
              and when you feel the need to avoid a obstacle you press space to jump
              over it! Simple right? Alright good luck friend!
            </p>
            <h2 className="subsection">Controls</h2>
            <p className="controls">
              Space- jump button
            </p>
          </div>
        </main>
      </div>
    </div>

  );
}