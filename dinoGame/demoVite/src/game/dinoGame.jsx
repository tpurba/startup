import React from 'react';
import './game.css';


export function DinoGame(props) {
    const userName = props.userName;

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