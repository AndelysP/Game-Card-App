import React, { useState } from 'react';
import Card from './components/Card';
import './assets/sass/App.scss';

const App = () => {
  const [playerCard, setPlayerCard] = useState(null);
  const [computerCard, setComputerCard] = useState(null);
  const [result, setResult] = useState('');

  const drawCards = () => {
    // Mélanger les cartes
    const shuffledCards = [...Card()].sort(() => Math.random() - 0.5);

    // Distribuer une carte à chaque joueur
    const playerCard = shuffledCards[0];
    const computerCard = shuffledCards[1];

    // Déterminer le résultat
    let result = '';
    if (playerCard.value > computerCard.value) {
      result = 'Vous avez gagné !';
    } else if (playerCard.value < computerCard.value) {
      result = 'Le bot a gagné !';
    } else {
      result = 'Égalité !';
    }

    // Mettre à jour les états
    setPlayerCard(playerCard);
    setComputerCard(computerCard);
    setResult(result);
  };

  return (
    <>
      <div className="header">
        <h1>Jeu de cartes - Bataille</h1>
        <button onClick={drawCards}>Tirer les cartes</button>
      </div>
      
      <div className="displayCard">
        {computerCard && (
          <>
            <h2>Bot :</h2>
            <p className="card">{computerCard.name}</p>
          </>
        )}
        {playerCard && (
          <>
            <h2>Vous :</h2>
            <p className="card">{playerCard.name}</p>
          </>
        )}
      </div>
      {result && <h2>{result}</h2>}
    </>
  );
};

export default App;
