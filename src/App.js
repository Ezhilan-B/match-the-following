// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game1 from './Game1';
import Navigation from './navigation';
import Home from './home';
import ScorePage from './scorePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/match-the-following/game1" element={<Game1 />}> 
        </Route>
        <Route path="/match-the-following" element={<Home />}>
        </Route>
        <Route path="/match-the-following/home" element={<Navigation />}>
        </Route>
        <Route path="/match-the-following/scorepage" element={<ScorePage />}>
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
