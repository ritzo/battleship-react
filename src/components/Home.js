import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BoardEditorContainer from '../containers/BoardEditorContainer';
import { BOARD_TYPES } from '../constants/Constants';

import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.gameData = props.gameData;
    this.actions = props.actions;

    this.name = this.gameData.player;
    this.playerBoard = this.gameData.playerBoard;
  }

  handleChange(event) {
    this.name = event.target.value;
    this.actions.setName(this.name);
  }

  render() {
    return (
      <div>
        <h1>Home</h1>

        <span>Name:</span>
        <input type="text" value={this.name} onChange={event => this.handleChange(event)} />

        <BoardEditorContainer
          title="Place your ships admiral"
          type={BOARD_TYPES.EDITION}
          squares={this.playerBoard}
          clickAction={this.clickAction}
        />

        <Link to="/game">Play</Link>
      </div>
    );
  }
}

Home.propTypes = {
  gameData: PropTypes.shape({
    player: PropTypes.string,
    playerBoard: PropTypes.array.isRequired,
    availableShips: PropTypes.array.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  actions: PropTypes.object.isRequired,
};

export default Home;
