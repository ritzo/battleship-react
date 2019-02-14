import React from 'react';
import PropTypes from 'prop-types';

import Square from './Square';
import NextShip from './NextShip';
import { BOARD_TYPES } from '../constants/Constants';

import './Board.css';

function renderSquare(square, handleClick, i) {
  return (
    <Square
      key={i}
      value={square}
      onClick={() => handleClick(i)}
    />
  );
}

function createTable(matrix, handleClick) {
  const table = [];

  matrix.forEach((squaresX, indexY) => {
    const children = [];
    squaresX.forEach((eachSquare, indexX) => {
      const index = (indexY * 10) + indexX;
      children.push(renderSquare(eachSquare, handleClick, index));
    });
    // The elements in the matrix won't change positions nor new items will be added
    // eslint-disable-next-line react/no-array-index-key
    table.push(<div key={indexY} className="board-row">{children}</div>);
  });

  return table;
}

class Board extends React.Component {
  render() {
    const {
      title, type, matrix,
    } = this.props;

    let boardClass = '';

    switch (type) {
      case BOARD_TYPES.EDITION:
        boardClass = 'edition';
        break;

      case BOARD_TYPES.PLAYER:
        boardClass = 'player';
        break;

      case BOARD_TYPES.OPONENT:
        boardClass = 'oponent';
        break;

      default:
        // Invalid board type
        break;
    }

    this.onClickHandler = (index) => {
      const { actions } = this.props;

      actions.onClickHandler(index);
    };

    this.renderEdition = () => {
      if (!BOARD_TYPES.EDITION === type) {
        return null;
      }
      return (<NextShip />);
    };

    return (
      <div className={boardClass}>
        { type }
        <div className="status">{ title }</div>
        { createTable(matrix, this.onClickHandler) }
        { this.renderEdition() }
      </div>
    );
  }
}

Board.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string).isRequired).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  actions: PropTypes.object.isRequired,
};

export default Board;
