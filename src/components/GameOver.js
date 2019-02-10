import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './GameOver.css';

const GameOver = ({ gameData, actions }) => (
  <div>
    <h1>GameOver</h1>
    <Link to="/">Play again</Link>
  </div>
);

GameOver.propTypes = {
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

export default GameOver;
