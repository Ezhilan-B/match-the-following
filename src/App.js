// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game1 from './Game1';
import Navigation from './navigation';
import Home from './home';
import ScorePage from './scorePage';
import { HashRouter } from "react-router-dom";


function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/game1" element={<Game1 />}> 
    //     </Route>
    //     <Route path="/" element={<Home />}>
    //     </Route>
    //     <Route path="/home" element={<Navigation />}>
    //     </Route>
    //     <Route path="/scorepage" element={<ScorePage />}>
    //     </Route>
    //   </Routes>
    // </Router>
    <Game1 />

  );
}

export default App;
