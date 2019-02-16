import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './GameOver.css';

class GameOver extends React.Component {
  constructor(props) {
    super(props);

    this.actions = props.actions;
  }

  render() {
    const {
      player,
      playerBoard,
      oponentBoard,
      state,
      winner,
      actions,
    } = this.props;

    return (
      <div>
        <h1>GameOver</h1>

        { player }
        <br />
        { playerBoard }
        <br />
        { oponentBoard }
        <br />
        { state }
        <br />
        { winner }

        <Link to="/">Play again</Link>
      </div>
    );
  }
};

GameOver.propTypes = {
  player: PropTypes.string.isRequired,
  playerBoard: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  ).isRequired,
  oponentBoard: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  ).isRequired,
  state: PropTypes.string.isRequired,
  winner: PropTypes.string.isRequired,
  actions: PropTypes.shape({}).isRequired,
};

export default GameOver;
