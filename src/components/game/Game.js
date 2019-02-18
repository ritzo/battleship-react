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

    const playerBoardTitle = `${player}'s fleet`;
    const nextTurn = (next === PLAYERS.PLAYER ? `${player}'s turn` : 'CPU`s turn');

    if (state === STATES.OPEN) {
      return <Redirect to="/" />;
    }

    if (state === STATES.FINISHED) {
      return <Redirect to="/gameOver" />;
    }

    return (
      <div>
        <div>
          <div className="board-container">
            <BoardPlayerContainer
              title={playerBoardTitle}
              type={BOARD_TYPES.PLAYER}
            />
          </div>
          <div className="board-container">
            <BoardOponentContainer
              title="CPU's fleet"
              type={BOARD_TYPES.OPONENT}
            />
          </div>
        </div>

        <p className="next-turn">{nextTurn}</p>
        <button type="button" className="surrender" onClick={() => this.handleSurrenderClick()}>Surrender</button>
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
  }).isRequired,
};

export default Game;
