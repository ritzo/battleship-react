import React from 'react';
import { Link } from 'react-router-dom';
import Board from './Board';

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
        <Board />

        <Link to="/gameOver">Surrender</Link>
      </div>
    );
  }
}

export default Game;
