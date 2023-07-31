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
      <Route path="/game1" element={<Game1/>}> 
        </Route>
        <Route path="/player" element={<Home />}>
        </Route>
        <Route path="/home" element={<Navigation />}>
        </Route>
        <Route path="/scorepage" element={<ScorePage />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
