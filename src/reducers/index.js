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
} from '../constants/Constants';

const initialState = {
  player: 'Player',
  playerBoard: Array(100).fill(null),
  playerBoardLast: null,
  oponentBoard: Array(100).fill(null),
  oponentBoardLast: null,
  availableShips: SHIPS,
  state: STATES.OPEN,
  next: null,
  winner: null,
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case SETUP_BOARD:
      return initialState;

    case SET_NAME:
      return Object.assign({}, state, { player: action.param });

    case ADD_SHIP:
      return [];

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
