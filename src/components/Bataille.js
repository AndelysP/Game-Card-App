import React, { useState } from 'react';
import '../assets/sass/App.scss'
import cards from '../components/Cards';
import { Link } from 'react-router-dom';

const Bataille = () => {
  const [playedCard, setPlayedCard] = useState(null);
  const [hiddenCards, setHiddenCards] = useState(cards.slice(1));
  const [botCard, setBotCard] = useState(null);
  const [winner, setWinner] = useState('');

  const [playerWins, setPlayerWins] = useState(0);
  const [botWins, setBotWins] = useState(0);

  const drawRandomCard = () => {
    if (hiddenCards.length === 0) {
      setPlayedCard(null);
      setBotCard(null);
      setWinner('');
      return;
    }

    const randomIndex = Math.floor(Math.random() * hiddenCards.length);
    const randomCard = hiddenCards[randomIndex];

    setPlayedCard(randomCard);
    // permet de mettre à jour le tableau hiddenCards en supprimant la carte qui a été tirée aléatoirement, ainsi cette carte n'est plus disponible pour les prochains tirages.
    setHiddenCards(hiddenCards.filter((_, index) => index !== randomIndex)); // '_' ignore le premier argument

    const botRandomIndex = Math.floor(Math.random() * hiddenCards.length);
    const botRandomCard = hiddenCards[botRandomIndex];
    setBotCard(botRandomCard);

    // Vérification du gagnant
    if (randomCard.value > botRandomCard.value) {
      setPlayerWins(playerWins + 1); // Incrémenter le compteur de victoires du joueur
      setWinner('Vous avez gagné');
    } else if (randomCard.value < botRandomCard.value) {
      setBotWins(botWins + 1); // Incrémenter le compteur de victoires du bot
      setWinner('Le bot a gagné');
    } else {
      setWinner('Égalité');
    }
  };

  const handleClick = () => {
    setPlayedCard(null);
    setBotCard(null);
    setWinner('');
    setPlayerWins(0);
    setBotWins(0);
    setHiddenCards(cards);
  };


  return (
    <>
      <h1>Jeu de la bataille</h1>
      <div className="container">
        <div className="card-pile">
          <ul onClick={drawRandomCard}>
            {hiddenCards
              .slice(0, 1)
              .map(index => (
                <li key={index} className="hidden-card">
                  ♔
                  <p>{hiddenCards.length}</p>
                </li>
              ))}
          </ul>
        </div>
        <div className="card-game">
          <div className="card-played">
            <h2>Carte jouée</h2>
            {playedCard ? (
              <p className={`played-card ${playedCard.suit === '♥' || playedCard.suit === '♦' ? 'red' : ''}`}>
                {playedCard.name} {playedCard.suit}
              </p>
            ) : (
              <p>Aucune carte jouée</p>
            )}
          </div>
          <div className="card-played">
            <h2>Carte du bot</h2>
            {botCard ? (
              <p className={`played-card ${botCard.suit === '♥' || botCard.suit === '♦' ? 'red' : ''}`}>
                {botCard.name} {botCard.suit}
              </p>
            ) : (
              <p>Aucune carte jouée par le bot</p>
            )}
          </div>
        </div>
      </div>
      <div className='result'>
        <h2>Résultat</h2>
        <p>{winner}</p>
        <p>Victoires joueur: {playerWins}</p>
        <p>Victoires bot: {botWins}</p>
        <button className='button play' onClick={handleClick}>Rejouer</button>
      </div >

      <div className="back">
        <Link to="/"><button className='button play'>Revenir à la page d'accueil</button></Link>
      </div>
    </>
  );
};

export default Bataille;