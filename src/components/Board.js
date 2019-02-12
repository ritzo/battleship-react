import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Square from './Square';
import { BOARD_TYPES } from '../constants/Constants';

import './Board.css';

function renderSquare(squares, handleClick, i) {
  return (
    <Square
      key={i}
      value={squares[i]}
      onClick={() => handleClick(i)}
    />
  );
}

function createTable(squares, handleClick) {
  const table = [];

  for (let i = 0; i < 10; i += 1) {
    const children = [];

    for (let j = 0; j < 10; j += 1) {
      const index = (i * 10) + j;
      children.push(renderSquare(squares, handleClick, index));
    }

    table.push(<div key={i} className="board-row">{children}</div>);
  }
  return table;
}

class Board extends React.Component {
  render() {
    const {
      title, type, playerBoard, oponentBoard,
    } = this.props;
    let boardClass = '';
    let squares = [];

    switch (type) {
      case BOARD_TYPES.EDITION:
        boardClass = 'edition';
        squares = playerBoard;
        break;

      case BOARD_TYPES.PLAYER:
        boardClass = 'player';
        squares = playerBoard;
        break;

      case BOARD_TYPES.OPONENT:
        boardClass = 'oponent';
        squares = oponentBoard;
        break;

      default:
        // Invalid board type
        break;
    }

    this.fun = (index) => {
      // eslint-disable-next-line no-alert
      alert(`asdsad${index}`);
    };

    return (
      <div className={boardClass}>
        { type }
        <div className="status">{ title }</div>
        { createTable(squares, this.fun) }
      </div>
    );
  }
}

Board.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  playerBoard: PropTypes.arrayOf(PropTypes.string).isRequired,
  oponentBoard: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function mapStateToProps(state) {
  return {
    playerBoard: state.playerBoard,
    oponentBoard: state.oponentBoard,
    playerBoardLast: state.playerBoardLast,
    oponentBoardLast: state.oponentBoardLast,
  };
}

export default connect(mapStateToProps)(Board);
