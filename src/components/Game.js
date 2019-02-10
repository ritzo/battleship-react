import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Board from './Board';

import './Game.css';

const Game = ({ gameData, actions }) => (
  <div>
    <h1>Game</h1>

    <span>Hello</span>
    <b>{gameData.player}</b>
    <br />
    <Board />

    <Link to="/gameOver">Surrender</Link>
  </div>
);

Game.propTypes = {
  gameData: PropTypes.shape({
    player: PropTypes.string,
    playerBoard: PropTypes.array.isRequired,
    playerBoardLast: PropTypes.number,
    oponentBoard: PropTypes.array.isRequired,
    oponentBoardLast: PropTypes.number,
    availableShips: PropTypes.array.isRequired,
    state: PropTypes.string.isRequired,
    next: PropTypes.string,
    winner: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  actions: PropTypes.object.isRequired,
};

export default Game;
