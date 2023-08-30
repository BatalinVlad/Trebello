import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/styles/global.scss'

import Home from './pages/Home.js';
import Board from './pages/Board.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board/:type/:id" element={<Board />} />
      </Routes>
    </Router>
  );
}

export default App;
