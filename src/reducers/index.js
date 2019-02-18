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
} from '../constants/Constants';

/*
const test = [
  [
    'empty', 'ship', 'shoot_miss', 'empty', 'ship_sunken', 'empty', 'empty', 'empty', 'empty', 'empty',
  ],
  [
    'empty', 'ship', 'shoot_miss', 'empty', 'ship_sunken', 'empty', 'empty', 'empty', 'empty', 'empty',
  ],
  [
    'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
  ],
  [
    'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
  ],
  [
    'empty', 'empty', 'empty', 'empty', 'empty', 'ship', 'empty', 'empty', 'empty', 'empty',
  ],
  [
    'empty', 'empty', 'empty', 'empty', 'empty', 'ship', 'empty', 'empty', 'empty', 'empty',
  ],
  [
    'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
  ],
  [
    'shoot_ship', 'shoot_ship', 'ship', 'ship', 'ship', 'empty', 'empty', 'empty', 'empty', 'empty',
  ],
  [
    'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
  ],
  [
    'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
  ],
];
*/

const initialState = {
  player: 'Player',
  editableBoard: Array(10).fill([]).map((() => Array(10).fill(SQUARE_STATES.EMPTY))),
  playerBoard: Array(10).fill([]).map((() => Array(10).fill(SQUARE_STATES.EMPTY))),
  playerBoardLast: null,
  oponentBoard: Array(10).fill([]).map((() => Array(10).fill(SQUARE_STATES.EMPTY))),
  oponentBoardLast: null,
  availableShips: [...SHIPS],
  state: STATES.OPEN,
  next: PLAYERS.PLAYER,
  winner: null,
};

export default function reducers(state = initialState, action) {
  const { param } = action;

  switch (action.type) {
    case SETUP_BOARD:
      return initialState;

    case SET_NAME:
      return Object.assign({}, state, { player: param });

    case ADD_SHIP: {
      return Object.assign({}, state, param);
    }
    case PLAY:
      return Object.assign({}, state, {
        state: STATES.PLAYING,
        playerBoard: [...param.playerBoard],
        oponentBoard: [...param.oponentBoard],
      });

    case SURRENDER:
      return Object.assign({}, state, { state: STATES.FINISHED, winner: PLAYERS.OPONENT });

    case SHOOT:
      return Object.assign({}, state, param);

    case OPONENT_TURN:
      return Object.assign({}, state, param);

    default:
      return state;
  }
}
