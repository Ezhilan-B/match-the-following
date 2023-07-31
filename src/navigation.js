// Navigation.js (or any other component where you want to include the link)
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/game.css'

function Navigation() {
  return (
    <div className='container'>
      <div className='message-container'>
      <nav>
      <ul className='unordered-list'>
        <li className='list'>
          <Link to="/game1">Game 1</Link>
        </li>
        {/* Add other navigation items if needed */}
      </ul>
    </nav>
      </div>
      

    </div>
    
  );
}

export default Navigation;
