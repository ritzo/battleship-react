import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import BoardEditorContainer from '../board/BoardEditorContainer';
import { BOARD_TYPES, STATES } from '../../constants/Constants';

import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.actions = props.actions;
  }

  handleChange(event) {
    this.actions.setName(event.target.value);
  }

  handlePlayClick() {
    this.actions.play();
  }

  render() {
    const {
      player,
      availableShips,
      state,
    } = this.props;

    if (state === STATES.FINISHED) {
      return <Redirect to="/gameOver" />;
    }

    if (state === STATES.PLAYING) {
      return <Redirect to="/game" />;
    }

    return (
      <div className="home">
        <h1>Home</h1>

        <span>Name:</span>
        <input type="text" value={player} onChange={event => this.handleChange(event)} />

        <BoardEditorContainer
          title="Place your ships admiral"
          type={BOARD_TYPES.EDITION}
        />

        <button type="button" className="play" onClick={() => this.handlePlayClick()} disabled={availableShips.length}>Play</button>
      </div>
    );
  }
}

Home.propTypes = {
  player: PropTypes.string.isRequired,
  availableShips: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  state: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    play: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
