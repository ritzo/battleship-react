import React from 'react';
import { Link } from 'react-router-dom';

import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Game</h1>
        <Link to="/gameOver">Surrender</Link>
      </div>
    );
  }
}

export default Game;
