import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import GameCard from './components/GameCard';
import Bataille from './components/Bataille';

const Root = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path='gamecard' element={<GameCard />} />
        <Route path='bataille' element={<Bataille />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Root