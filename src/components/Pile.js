import React from 'react';
import Carte from './Carte';

const Pile = () => {
    const cards = [
        { name: 'As', value: 14 },
        { name: 'Roi', value: 13 },
        { name: 'Dame', value: 12 },
        { name: 'Valet', value: 11 },
        { name: '10', value: 10 },
        { name: '9', value: 9 },
        { name: '8', value: 8 },
        { name: '7', value: 7 },
        { name: '6', value: 6 },
        { name: '5', value: 5 },
        { name: '4', value: 4 },
        { name: '3', value: 3 },
        { name: '2', value: 2 }
    ]

    return (
        <div className="pile-de-cartes">
            {cards.map((carte, index) => (
                <Carte key={index} nom={carte.name} valeur={carte.value} />
            ))}
        </div>
    );
};

export default Pile;