import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import BoardPlayerContainer from '../board/BoardPlayerContainer';
import BoardOponentContainer from '../board/BoardOponentContainer';

import { BOARD_TYPES, STATES, PLAYERS } from '../../constants/Constants';

import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.actions = props.actions;
  }

  handleSurrenderClick() {
    this.actions.surrender();
  }

  render() {
    const {
      player,
      next,
      state,
    } = this.props;

    if (state === STATES.OPEN) {
      return <Redirect to="/" />;
    }

    if (state === STATES.FINISHED) {
      return <Redirect to="/gameOver" />;
    }

    /*
    if (PLAYERS.OPONENT === next && STATES.PLAYING === state) {
      // Its the CPU turn
      setTimeout(() => {
        this.actions.oponentTurn();
      }, 300);
    }
    */

    return (
      <div>
        <h1>Game</h1>

        <span>Hello</span>

        <b>{ player }</b>
        <br />

        <BoardPlayerContainer
          title="Your fleet"
          type={BOARD_TYPES.PLAYER}
        />

        <BoardOponentContainer
          title="CPU's fleet"
          type={BOARD_TYPES.OPONENT}
        />

        <button type="button" onClick={() => this.handleSurrenderClick()}>Surrender</button>
      </div>
    );
  }
}

Game.propTypes = {
  player: PropTypes.string.isRequired,
  next: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    surrender: PropTypes.func.isRequired,
    // oponentTurn: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
