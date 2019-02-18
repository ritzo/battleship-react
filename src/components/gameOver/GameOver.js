import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { STATES, PLAYERS } from '../../constants/Constants';

import './GameOver.css';

class GameOver extends React.Component {
  constructor(props) {
    super(props);

    this.actions = props.actions;
  }

  handlePlayAgainClick() {
    this.actions.setupBoard();
  }

  renderInformation() {
    const { winner, surrendered } = this.props;
    const isWinner = winner === PLAYERS.PLAYER;

    if (isWinner) {
      return (
        <p>You won, congratulations!</p>
      );
    }
    return (
      <div>
        <p>You lost, better luck next time</p>
        <p>{ (surrendered ? 'You ran away' : 'You fought bravely') }</p>
      </div>
    );
  }

  render() {
    const {
      state,
    } = this.props;

    if (state === STATES.OPEN) {
      return <Redirect to="/" />;
    }

    return (
      <div className="game-over">
        <h1>Game Over</h1>

        { this.renderInformation() }

        <button type="button" className="play" onClick={() => this.handlePlayAgainClick()}>Play again</button>
      </div>
    );
  }
}

GameOver.propTypes = {
  state: PropTypes.string.isRequired,
  winner: PropTypes.string.isRequired,
  surrendered: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    setupBoard: PropTypes.func.isRequired,
  }).isRequired,
};

export default GameOver;
