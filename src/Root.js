import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';

const Root = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Root