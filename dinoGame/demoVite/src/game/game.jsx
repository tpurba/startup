import React from 'react';
import { Players } from './players';
import { DinoGame } from './dinoGame';
import './game.css';
export function Game(props) {
  return (
    <main className='game'>
      <Players userName={props.userName} />
     <DinoGame userName={props.userName} />
    </main>
  );
}