import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BoardContainer from '../containers/BoardEditorContainer';

import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.gameData = props.gameData;
    this.actions = props.actions;
  }

  render() {
    return (
      <div>
        <h1>Game</h1>

        <span>Hello</span>

        <b>{this.gameData.player}</b>
        <br />
        <BoardContainer />

        <Link to="/gameOver">Surrender</Link>
      </div>
    );
  }
}

Game.propTypes = {
  gameData: PropTypes.shape({
    player: PropTypes.string,
    playerBoard: PropTypes.array.isRequired,
    playerBoardLast: PropTypes.number,
    oponentBoard: PropTypes.array.isRequired,
    oponentBoardLast: PropTypes.number,
    state: PropTypes.string.isRequired,
    next: PropTypes.string,
    winner: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  actions: PropTypes.object.isRequired,
};

export default Game;
