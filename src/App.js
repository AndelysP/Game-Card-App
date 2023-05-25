import React from 'react'
import { Link } from 'react-router-dom'

const App = () => {
  return (
    <div className='home'>
      <h1>A quel jeu souhaitez-vous jouer ? </h1>
      <Link to="gamecard"><button className="button play">Jeu de cartes</button></Link>
      <Link to="bataille"><button className="button play">Jeu de la "Bataille"</button></Link>
    </div>
  )
}

export default App