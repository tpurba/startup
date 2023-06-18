import React from 'react';
import { Players } from './players';
import { DinoGame } from './dinoGame';

export function Game(props) {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <Players userName={props.userName} />
     <DinoGame userName={props.userName} />
    </main>
  );
}