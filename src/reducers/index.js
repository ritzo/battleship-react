import {
  SETUP_BOARD,
  SET_NAME,
  ADD_SHIP,
  SURRENDER,
  PLAY,
  SHOOT,
  OPONENT_TURN,
} from '../constants/ActionTypes';

import {
  STATES,
  SHIPS,
  PLAYERS,
  SQUARE_STATES,
  ORIENTATION,
} from '../constants/Constants';

const initialState = {
  player: 'Player',
  nextShipOrientation: ORIENTATION.HORIZONTAL,
  editableBoard: Array(10).fill(Array(10).fill(SQUARE_STATES.EMPTY)),
  playerBoard: Array(10).fill(Array(10).fill(SQUARE_STATES.EMPTY)),
  playerBoardLast: null,
  oponentBoard: Array(10).fill(Array(10).fill(SQUARE_STATES.EMPTY)),
  oponentBoardLast: null,
  availableShips: SHIPS,
  state: STATES.OPEN,
  next: null,
  winner: null,
};

/**
* Returns true if the position selected for the ship is valid.
*/
function checkShipPosition(board, position, ship, orientation) {
  let squares = [];
  const x = position % 10;
  const y = Math.floor(position / 10);

  if (ORIENTATION.HORIZONTAL === orientation) {
    squares = board[y].splice(x, x + ship);
  } else {
    for (let index = y; index < (y + ship); index += 1) {
      if (index < 10) {
        squares.push(board[index][x]);
      }
    }
  }

  const allValid = squares.every(eachSquare => SQUARE_STATES.EMPTY === eachSquare);

  return allValid && squares.length === ship;
}

/**
 * Checks whether it is a valid position.
 */
function isValidPosition(position) {
  return (position >= 0 && position <= 9);
}

/**
* It marks the square of the position [x, y] as a ship, and the surrounding squares as invalids.
*/
function markShip(board, x, y) {
  // eslint-disable-next-line no-param-reassign
  board[y][x] = SQUARE_STATES.SHIP;

  const surroundingY = [y - 1, y + 1];
  const surroundingX = [x - 1, x + 1];

  surroundingY.forEach((eachY) => {
    if (isValidPosition(eachY)) {
      surroundingX.forEach((eachX) => {
        if (isValidPosition(eachX)) {
          // eslint-disable-next-line no-param-reassign
          board[eachY][eachX] = (board[eachY][eachX] === SQUARE_STATES.SHIP
            ? SQUARE_STATES.SHIP
            : SQUARE_STATES.INVALID);
        }
      });
    }
  });
}

/**
* It adds to the board the ship, starting from the position [x, y].
*/
function addShip(board, position, ship, orientation) {
  let x = position % 10;
  let y = Math.floor(position / 10);

  for (let index = 0; index < +ship; index += 1) {
    if (ORIENTATION.HORIZONTAL === orientation) {
      x += index;
    } else {
      y += index;
    }

    markShip(board, x, y);
  }
}

function cloneBoard(board) {
  const newBoard = Array(10);

  board.forEach((squares, i) => {
    newBoard[i] = squares.slice();
  });

  return newBoard;
}

export default function reducers(state = initialState, action) {
  const { param } = action;

  switch (action.type) {
    case SETUP_BOARD:
      return initialState;

    case SET_NAME:
      return Object.assign({}, state, { player: param });

    case ADD_SHIP: {
      const { editableBoard, nextShipOrientation, availableShips } = state;
      const [nextShip] = availableShips;

      const valid = checkShipPosition(editableBoard, param, nextShip, nextShipOrientation);

      if (!valid) {
        return state;
      }

      const newBoard = cloneBoard(editableBoard);
      addShip(newBoard, param, nextShip, nextShipOrientation);
      const newAvailableShips = availableShips.slice(1);

      return Object.assign({}, state, {
        editableBoard: newBoard,
        availableShips: newAvailableShips,
      });
    }
    case PLAY:
      return Object.assign({}, state, { state: STATES.PLAYING });

    case SURRENDER:
      return Object.assign({}, state, { state: STATES.FINISHED, winner: PLAYERS.OPONENT });

    case SHOOT:
      return [];

    case OPONENT_TURN:
      return [];

    default:
      return state;
  }
}
