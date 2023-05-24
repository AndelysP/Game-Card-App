import React, { useState } from 'react';

const Carte = ({ nom, valeur }) => {
    const [isReveal, setIsReveal] = useState(false);

    const gererClic = () => {
        setIsReveal(true);
    };

    return (
        <div
            className={`carte ${isReveal ? 'revelee' : ''}`}
            onClick={gererClic}
        >
            {isReveal
                ?
                <>
                    <div>{nom}</div>
                    <div>{valeur}</div>
                </>
                : 'Caché'}
        </div>
    );
};

export default Carte;
