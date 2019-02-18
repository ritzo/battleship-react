import * as types from '../constants/ActionTypes';
import {
  STATES,
  SHIPS,
  PLAYERS,
  SQUARE_STATES,
  ORIENTATION,
  SQUARE_STATES_ALREADY_SHOT,
  SQUARE_STATES_FLOATING_SHIP,
  SQUARE_STATES_OPONENT_VALID_SHOOT,
  SQUARE_STATES_SINKING_SHIP,
} from '../constants/Constants';

function intArraySorter(a, b) {
  return a - b;
}

function cloneBoard(board) {
  return board.map(squares => [...squares]);
}

/**
 * Removes the square states used during the board creation.
 */
function cleanUpBoard(board) {
  return board.map(
    column => column.map(square => (square !== SQUARE_STATES.SHIP ? SQUARE_STATES.EMPTY : square)),
  );
}

/**
* Returns true if the position selected for the ship is valid.
*/
function checkShipPosition(board, x, y, ship, orientation) {
  let squares = [];

  if (ORIENTATION.HORIZONTAL === orientation) {
    squares = board[y].slice(x, x + ship);
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

  const surroundingY = [y - 1, y, y + 1];
  const surroundingX = [x - 1, x, x + 1];

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
function addShipToBoard(board, x, y, ship, orientation) {
  let indexX = x;
  let indexY = y;

  for (let index = 0; index < +ship; index += 1) {
    if (ORIENTATION.HORIZONTAL === orientation) {
      indexX = x + index;
    } else {
      indexY = y + index;
    }

    markShip(board, indexX, indexY);
  }
}

/**
 * Creates the oponent board randomly.
 */
function createOponentBoard() {
  const board = Array(10).fill([]).map((() => Array(10).fill(SQUARE_STATES.EMPTY)));

  SHIPS.forEach((eachShip) => {
    let valid = false;
    let positionX = 0;
    let positionY = 0;
    let orientation = '';

    while (!valid) {
      const position = Math.floor(Math.random() * 99);
      positionY = Math.floor(position / 10);
      positionX = position % 10;
      orientation = (Math.random() >= 0.5 ? ORIENTATION.HORIZONTAL : ORIENTATION.VERTICAL);

      valid = checkShipPosition(board, positionX, positionY, eachShip, orientation);
    }

    addShipToBoard(board, positionX, positionY, eachShip, orientation);
  });

  return board;
}

/**
 * Return a list with the coordinates of the ship, if its orientated vertically.
 */
function getVerticalShipPosition(board, x, y) {
  const positions = [];
  let positionY = y - 1;
  while (positionY >= 0 && SQUARE_STATES_FLOATING_SHIP.indexOf(board[positionY][x]) !== -1) {
    positions.push({ x, y: positionY });
    positionY -= 1;
  }

  positionY = y + 1;
  while (positionY <= 9 && SQUARE_STATES_FLOATING_SHIP.indexOf(board[positionY][x]) !== -1) {
    positions.push({ x, y: positionY });
    positionY += 1;
  }

  return positions;
}

/**
 * Return a list with the coordinates of the ship, if its orientated horizantally.
 */
function getHorizontalShipPosition(board, x, y) {
  const positions = [];
  let positionX = x - 1;
  while (positionX >= 0 && SQUARE_STATES_FLOATING_SHIP.indexOf(board[y][positionX]) !== -1) {
    positions.push({ x: positionX, y });
    positionX -= 1;
  }

  positionX = x + 1;
  while (positionX <= 9 && SQUARE_STATES_FLOATING_SHIP.indexOf(board[y][positionX]) !== -1) {
    positions.push({ x: positionX, y });
    positionX += 1;
  }

  return positions;
}

/**
 * It returns a list with the coordinates of the ship
 *  placed in the point passed as parameter.
 */
function getShipPositions(board, x, y) {
  return [
    { x, y },
    ...getVerticalShipPosition(board, x, y),
    ...getHorizontalShipPosition(board, x, y),
  ];
}

/**
 * Marks the shot made in the board. If it hits and sinks a ship,
 *  it updates the states of the ship's squares.
 *
 * Returns the board updated, or null if the shot could not be made
 */
function markShot(board, x, y) {
  const newBoard = cloneBoard(board);
  const previousState = newBoard[y][x];
  const newState = (SQUARE_STATES.SHIP === previousState
    ? SQUARE_STATES.SHOOT_SHIP
    : SQUARE_STATES.SHOOT_MISS);

  if (SQUARE_STATES_ALREADY_SHOT.indexOf(previousState) !== -1) {
    return null;
  }

  newBoard[y][x] = newState;

  if (SQUARE_STATES.SHOOT_SHIP === newState) {
    // The shoot hit a ship. If it was the last part of the ship
    //  alive, it must update the ship state.
    const shipPositions = getShipPositions(newBoard, x, y);

    const shipSunken = shipPositions.every((position) => {
      const posX = position.x;
      const posY = position.y;

      return SQUARE_STATES.SHOOT_SHIP === newBoard[posY][posX];
    });

    if (shipSunken) {
      shipPositions.forEach((position) => {
        const posX = position.x;
        const posY = position.y;

        newBoard[posY][posX] = SQUARE_STATES.SHIP_SUNKEN;

        // Mark the surrounding squares as invalids.
        const surroundingY = [posY - 1, posY, posY + 1];
        const surroundingX = [posX - 1, posX, posX + 1];

        surroundingY.forEach((eachY) => {
          if (isValidPosition(eachY)) {
            surroundingX.forEach((eachX) => {
              if (isValidPosition(eachX)) {
                // eslint-disable-next-line no-param-reassign
                newBoard[eachY][eachX] = (
                  SQUARE_STATES_SINKING_SHIP.indexOf(newBoard[eachY][eachX]) !== -1
                    ? newBoard[eachY][eachX]
                    : SQUARE_STATES.INVALID);
              }
            });
          }
        });
      });
    }
  }

  return newBoard;
}

/**
 * Returns a boolean that indicates if the player has destroyed all ships.
 */
function hasWon(board) {
  return board.every(column => column.every(square => SQUARE_STATES.SHIP !== square));
}

/**
 * Iterates over a board and return the position of the
 *  squares with one of the states received;
 */
function collectSquares(board, states) {
  const positions = [];

  board.forEach((column, indexY) => {
    column.forEach((square, indexX) => {
      if (states.indexOf(square) > -1) {
        positions.push({
          x: indexX,
          y: indexY,
        });
      }
    });
  });

  return positions;
}

function getRandom(list) {
  if (!list || !list.length) {
    return null;
  }

  const random = Math.round(Math.random() * (list.length - 1));
  return list[random];
}

function getValidShootPositions(board, positions) {
  return positions.filter((eachPosition) => {
    const { x, y } = eachPosition;

    if (!isValidPosition(x) || !isValidPosition(y)) {
      return false;
    }

    const square = board[y][x];

    return (SQUARE_STATES_OPONENT_VALID_SHOOT.indexOf(square) > -1);
  });
}

function getOponentNextShot(playerBoard) {
  // Search for the shoots that hit but didn't sink a ship.
  let positions = collectSquares(playerBoard, [SQUARE_STATES.SHOOT_SHIP]);

  switch (positions.length) {
    case 0:
      // There are no ships hit and floating. Look for all the available squares.
      positions = collectSquares(playerBoard, [SQUARE_STATES.EMPTY, SQUARE_STATES.SHIP]);
      break;
    case 1: {
      // A single shot was found. Targets the surrounding squares.
      const { x, y } = positions[0];
      const surroundingSquares = [
        { x, y: y - 1 }, { x, y: y + 1 }, { x: x - 1, y }, { x: x + 1, y },
      ];

      positions = getValidShootPositions(playerBoard, surroundingSquares);
      break;
    }
    default: {
      // More than one shot was found. Checks if the shots align vertically or
      //  horizontally and return the squares next to the ones found.
      const { x: positionX, y: positionY } = positions[0];
      const horizontalShots = [];
      const verticalShots = [];

      positions.forEach((each) => {
        if (positionX === each.x) {
          horizontalShots.push(each.y);
        }
        if (positionY === each.y) {
          verticalShots.push(each.x);
        }
      });

      horizontalShots.sort(intArraySorter);
      verticalShots.sort(intArraySorter);

      let surroundingSquares = 'asd';

      if (horizontalShots.length > 1) {
        // There was more than one shot horizontally aligned
        const first = horizontalShots[0];
        const last = horizontalShots.pop();

        surroundingSquares = [
          { x: positionX, y: first - 1 }, { x: positionX, y: last + 1 },
        ];
      } else if (verticalShots.length > 1) {
        // There was more than one shot vertically aligned
        const first = verticalShots[0];
        const last = verticalShots.pop();

        surroundingSquares = [
          { x: first - 1, y: positionY }, { x: last + 1, y: positionY },
        ];
      } else {
        // The shots were not alligned. Its an error.
        // It shoots in the surroundings of the first shot found.
        surroundingSquares = [
          { x: positionX, y: positionY - 1 },
          { x: positionX, y: positionY + 1 },
          { x: positionX - 1, y: positionY },
          { x: positionX + 1, y: positionY },
        ];
      }

      positions = getValidShootPositions(playerBoard, surroundingSquares);
    }
  }

  return getRandom(positions);
}

export const setupBoard = param => ({ type: types.SETUP_BOARD, param });
export const setName = param => ({ type: types.SET_NAME, param });
const addShipPrivate = param => ({ type: types.ADD_SHIP, param });
const playPrivate = param => ({ type: types.PLAY, param });
export const surrender = param => ({ type: types.SURRENDER, param });
const shootPrivate = param => ({ type: types.SHOOT, param });
const oponentTurnPrivate = param => ({ type: types.OPONENT_TURN, param });

export const addShip = param => (dispatch, getState) => {
  const state = getState();

  const { editableBoard, availableShips } = state;
  const [nextShip] = availableShips;
  const { orientation, x, y } = param;

  const valid = checkShipPosition(editableBoard, x, y, nextShip, orientation);

  if (!valid) {
    return null;
  }

  const newBoard = cloneBoard(editableBoard);
  addShipToBoard(newBoard, x, y, nextShip, orientation);
  const newAvailableShips = availableShips.slice(1);

  return dispatch(addShipPrivate({
    editableBoard: newBoard,
    availableShips: newAvailableShips,
  }));
};

export const play = () => (dispatch, getState) => {
  const state = getState();

  const {
    editableBoard,
  } = state;

  const oponentBoard = createOponentBoard();

  return dispatch(playPrivate({
    playerBoard: cleanUpBoard(editableBoard),
    oponentBoard: cleanUpBoard(oponentBoard),
  }));
};

export const oponentTurn = () => (dispatch, getState) => {
  const appState = getState();

  const {
    playerBoard,
    state,
    next,
    winner,
  } = appState;

  if (STATES.PLAYING !== state
      || PLAYERS.OPONENT !== next) {
    return null;
  }

  // Look for the possible squares to attack, prioritizing ship already hitten.
  const { x, y } = getOponentNextShot(playerBoard);

  const newBoard = markShot(playerBoard, x, y);

  const won = hasWon(newBoard);

  return dispatch(oponentTurnPrivate({
    playerBoard: newBoard,
    next: PLAYERS.PLAYER,
    winner: (won ? PLAYERS.OPONENT : winner),
    state: (won ? STATES.FINISHED : state),
  }));
};

export const shoot = param => (dispatch, getState) => {
  const appState = getState();

  const {
    oponentBoard,
    state,
    next,
    winner,
  } = appState;

  const { x, y } = param;

  if (STATES.PLAYING !== state
      || PLAYERS.PLAYER !== next) {
    return null;
  }

  const newBoard = markShot(oponentBoard, x, y);

  if (newBoard === null) {
    // The shoot is in the same position of a previous one.
    return null;
  }

  const won = hasWon(newBoard);

  const action = dispatch(shootPrivate({
    oponentBoard: newBoard,
    next: PLAYERS.OPONENT,
    winner: (won ? PLAYERS.PLAYER : winner),
    state: (won ? STATES.FINISHED : state),
  }));

  // Triggers the cpu turn after a short delay
  if (STATES.PLAYING === state) {
    setTimeout(() => {
      dispatch(oponentTurn());
    }, 500);
  }

  return action;
};
