import React from 'react';
import './index.css';
import { Unauthenticated } from './Unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';
export function Login({ userName, authState, onAuthChange })  {
  return (
    <main className='container-fluid bg-secondary text-center'>
    <div className = 'login-screen'>
      {authState !== AuthState.Unknown && <h1>Welcome to Dino-Game</h1>}
      {authState === AuthState.Authenticated && (
        <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
      )}
      {authState === AuthState.Unauthenticated && (
        <Unauthenticated
          userName={userName}
          onLogin={(loginUserName) => {
            onAuthChange(loginUserName, AuthState.Authenticated);
          }}
        />
      )}
    </div>
  </main>
  );
}