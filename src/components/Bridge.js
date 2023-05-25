import { Link } from "react-router-dom";
import React, { useState } from 'react';

const Bridge = () => {
    const [playerHand, setPlayerHand] = useState([]);
    const [botHands, setBotHands] = useState([[], [], []]);

    // Distribution des cartes
    const distributeCards = () => {
        // Création du deck
        const deck = createDeck();

        // Mélange du jeu de cartes
        shuffleDeck(deck);

        // Distribution des cartes
        const newPlayerHand = deck.slice(0, 13);
        const newBotHands = [deck.slice(13, 26), deck.slice(26, 39), deck.slice(39, 52)];

        // Mise à jour de states
        setPlayerHand(newPlayerHand);
        setBotHands(newBotHands);
    };

    // Créer le jeu de cartes
    const createDeck = () => {
        const suits = ['♠', '♥', '♦', '♣'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        const deck = [];
        for (const suit of suits) {
            for (const rank of ranks) {
                deck.push(`${rank}${suit}`);
            }
        }
        return deck;
    };

    // Mélanger le jeu de cartes
    const shuffleDeck = (deck) => {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    };

    return (
        <div className="bridge-game">
            <button className='button play' onClick={distributeCards}>Distribuer les cartes</button>
            <div className="player-hand">
                <h2>Joueur</h2>
                <div className="card-container">
                    {playerHand.map((card, index) => (
                        <div
                            key={index}
                            className={`card ${card.includes('♥') || card.includes('♦') ? 'red-card' : ''}`}
                        >
                            {card}
                        </div>
                    ))}
                </div>
            </div>
            <div className="bot-hands">
                {botHands.map((hand, botIndex) => (
                    <div key={botIndex} className="bot-hand">
                        <h3>Bot {botIndex + 1}</h3>
                        <div className="card-container">
                            {hand.map((card, index) => (
                                <div
                                    key={index}
                                    className={`card ${card.includes('♥') || card.includes('♦') ? 'red-card' : ''}`}
                                >
                                    {card}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="back">
                <Link to="/"><button className='button play'>Revenir à la page d'accueil</button></Link>
            </div>
        </div>
    );
};

export default Bridge