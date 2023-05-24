import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const suits = ['♥', '♠', '♦', '♣'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Valet', 'Dame', 'Roi', 'A'];

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Règles du jeu</h2>
        <p>
          • Le joueur et le bot possèdent une main de cinq cartes choisies aléatoirement <br />
          • Le but est de jouer une carte de la même suite (♥, ♠, ♦, ♣) ET d'une valeur plus élevée contre le bot pour remporter la partie
        </p>
        <button onClick={onClose} className="button">Fermer</button>
      </div>
    </div>
  );
};

const GameCard = () => {

  const [botCard, setBotCard] = useState({});
  const [playerHand, setPlayerHand] = useState([]);
  const [botHiddenCards, setBotHiddenCards] = useState([]);
  const [resultMessage, setResultMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Générer une main random 
  const generateRandomHand = () => {
    const hand = [];
    const hiddenCards = [];

    // Génère 4 cartes face cachées
    while (hiddenCards.length < 4) {
      // Choisi une suite & une valeur aléatoire
      const suit = suits[Math.floor(Math.random() * suits.length)];
      const value = values[Math.floor(Math.random() * values.length)];
      const card = { suit, value };

      // On vérifie si la carte tirée n'est pas déjà présente dans la main
      if (!hand.some((c) => c.suit === suit && c.value === value)) {
        hiddenCards.push(card);
      }
    }

    // Génère la carte visible du bot
    while (hand.length < 5) {
      const suit = suits[Math.floor(Math.random() * suits.length)];
      const value = values[Math.floor(Math.random() * values.length)];
      const card = { suit, value };
      if (!hand.some((c) => c.suit === suit && c.value === value)) {
        hand.push(card);
      }
    }

    setBotHiddenCards(hiddenCards);
    return hand;
  };

  useEffect(() => {
    const botHand = generateRandomHand();
    const botFirstCard = botHand[0];
    setBotCard(botFirstCard);

    const playerHand = generateRandomHand();
    setPlayerHand(playerHand);
  }, []);

  const playCard = (cardIndex) => {
    const card = playerHand[cardIndex];

    if (card.suit === botCard.suit) {
      const cardValueIndex = values.indexOf(card.value);
      const botCardValueIndex = values.indexOf(botCard.value);

      if (cardValueIndex > botCardValueIndex) {
        setResultMessage("Vous avez gagné !");
      } else if (cardValueIndex < botCardValueIndex) {
        setResultMessage("Vous avez perdu !");
      } else {
        setResultMessage("Égalité !");
      }
    } else {
      setResultMessage("Vous avez perdu !");
    }

    const newPlayerHand = [...playerHand];
    newPlayerHand.splice(cardIndex, 1);
    setPlayerHand(newPlayerHand);

    // On extrait la première carte du tableau qui est la nouvelle carte visible du bot
    const newBotCard = generateRandomHand()[0];
    setBotCard(newBotCard);

    // Supprimer la première carte face cachée
    removeHiddenCard();
  };

  const removeHiddenCard = () => {
    const newHiddenCards = [...botHiddenCards];
    newHiddenCards.splice(0, 1);
    setBotHiddenCards(newHiddenCards);
  };


  const resetGame = () => {
    const botHand = generateRandomHand();
    const botFirstCard = botHand[0];
    setBotCard(botFirstCard);

    const newPlayerHand = generateRandomHand();
    setPlayerHand(newPlayerHand);
  };

  return (
    <div className="app-container">
      <h1 className="title">Jeu de cartes</h1>
      <button className="button rules" onClick={openModal}>Règles du jeu</button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <h2 className="card-title">Bot :</h2>
      <div className="card-container">
        {botHiddenCards.map((card, index) => (
          <div key={index} className="card hidden-card"></div>
        ))}
        <div className="card">
          <p className={`card-value ${botCard.suit === '♥' || botCard.suit === '♦' ? 'red' : ''}`}>{botCard.value}</p>
          <p className={`card-suit ${botCard.suit === '♥' || botCard.suit === '♦' ? 'red' : ''}`}>{botCard.suit}</p>
        </div>
      </div>

      <h2 className="card-title">Votre main :</h2>
      <div className="card-container">
        <ul className="hand">
          {playerHand.map((card, index) => (
            <li key={index} className="card" onClick={() => playCard(index)}>
              <p className={`card-value ${card.suit === '♥' || card.suit === '♦' ? 'red' : ''}`}>{card.value}</p>
              <p className={`card-suit ${card.suit === '♥' || card.suit === '♦' ? 'red' : ''}`}>{card.suit}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="result-message">{resultMessage}</div>
      <button className="button play" onClick={resetGame}>Jouer</button>

      <div className="back">
        <Link to="/"><button className='button play'>Revenir à la page d'accueil</button></Link>
      </div>
    </div>
  );
}
export default GameCard