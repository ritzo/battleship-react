import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './GameOver.css';

// eslint-disable-next-line no-unused-vars
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
    oponentBoard: PropTypes.array.isRequired,
    state: PropTypes.string.isRequired,
    winner: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  actions: PropTypes.object.isRequired,
};

export default GameOver;
