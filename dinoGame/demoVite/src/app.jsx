import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Game } from './game/game';
import { Score } from './score/score';
import { About } from './about/about';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';



export default function App() {

  return (
    <BrowserRouter id = "body">
      <div id="page-container">
        <div id="content-wrap">
          <div className='body bg-dark text-light'>
            <header className='container-fluid'>
              <nav className='navbar fixed-top navbar-dark'>
                <div className='navbar-brand'>
                  Dino-Game<sup>&reg;</sup>
                </div>
                <menu className='navbar-nav'>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to=''>
                      Login
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='game'>
                      Game
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='score'>
                      Scores
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='about'>
                      About
                    </NavLink>
                  </li>
                </menu>
              </nav>
            </header>
            <Routes>
              <Route path='/' element={<Login />} exact />
              <Route path='/game' element={<Game />} />
              <Route path='/score' element={<Score />} />
              <Route path='/about' element={<About />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>

      <footer className='bg-dark text-white-50'>
        <div className='container-fluid'>
          <span className='text-reset'>Takun Purba</span>
          <a className='text-reset' href='https://github.com/tpurba/startup.git'>
            Source
          </a>
        </div>
      </footer>

    </BrowserRouter>
  );
}
function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}