import React from 'react';
import PropTypes from 'prop-types';

import SquareEditorContainer from '../square/SquareEditorContainer';
import SquarePlayerContainer from '../square/SquarePlayerContainer';
import SquareOponentContainer from '../square/SquareOponentContainer';
import NextShipContainer from '../nextShip/NextShipContainer';
import { BOARD_TYPES } from '../../constants/Constants';

import './Board.css';

function renderSquare(x, y, boardType) {
  switch (boardType) {
    case BOARD_TYPES.EDITION:
      return (
        <SquareEditorContainer
          key={x}
          x={x}
          y={y}
        />
      );
    case BOARD_TYPES.PLAYER:
      return (
        <SquarePlayerContainer
          key={x}
          x={x}
          y={y}
        />
      );
    case BOARD_TYPES.OPONENT:
      return (
        <SquareOponentContainer
          key={x}
          x={x}
          y={y}
        />
      );
    default:
      return null;
  }
}

function createTable(boardType) {
  const table = [];

  for (let y = 0; y < 10; y += 1) {
    const children = [];
    for (let x = 0; x < 10; x += 1) {
      children.push(renderSquare(x, y, boardType));
    }
    // The elements in the matrix won't change positions nor new items will be added
    // eslint-disable-next-line react/no-array-index-key
    table.push(<div key={y} className="board-row">{children}</div>);
  }

  return table;
}

class Board extends React.Component {
  render() {
    const {
      title, type, isNext,
    } = this.props;

    const boardClass = `${type} ${isNext ? 'is-next' : ''}`;

    this.renderEdition = () => {
      if (BOARD_TYPES.EDITION !== type) {
        return null;
      }
      return (
        <div>
          <p className="edition-hint">Left click to add a ship horizontally, right click to add it vertically.</p>
          <NextShipContainer />
        </div>
      );
    };

    return (
      <div className={boardClass}>
        <div className="status">{ title }</div>
        <div className="table-container">
          { createTable(type) }
        </div>
        { this.renderEdition() }
      </div>
    );
  }
}

Board.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isNext: PropTypes.bool.isRequired,
};

export default Board;
