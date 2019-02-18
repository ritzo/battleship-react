import reducer from './index';
import {
  SETUP_BOARD,
  SET_NAME,
  ADD_SHIP,
  PLAY,
  SURRENDER,
  SHOOT,
  OPONENT_TURN,
} from '../constants/ActionTypes';
import {
  SQUARE_STATES,
  SHIPS,
  STATES,
  PLAYERS,
} from '../constants/Constants';

const defaultState = {
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
  surrendered: false,
};

const otherState = {
  player: 'A player',
  editableBoard: Array(10).fill([]).map((() => Array(10).fill(SQUARE_STATES.SHOOT_MISS))),
  playerBoard: Array(10).fill([]).map((() => Array(10).fill(SQUARE_STATES.SHOOT_MISS))),
  playerBoardLast: 1,
  oponentBoard: Array(10).fill([]).map((() => Array(10).fill(SQUARE_STATES.SHOOT_MISS))),
  oponentBoardLast: 2,
  availableShips: [3],
  state: STATES.FINISHED,
  next: PLAYERS.OPONENT,
  winner: PLAYERS.OPONENT,
  surrendered: true,
};

describe('Reducer', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  describe('Action type SETUP_BOARD', () => {
    it('Should return the initial state', () => {
      const action = {
        type: SETUP_BOARD,
      };

      expect(reducer(undefined, action)).toEqual(defaultState);
    });

    it('Should return the initial state with the name previously set', () => {
      const action = {
        type: SETUP_BOARD,
      };

      const expectedState = Object.assign({}, defaultState, { player: otherState.player });
      expect(reducer(otherState, action)).toEqual(expectedState);
    });
  });

  describe('Action type SET_NAME', () => {
    it('Should change the player\'s name', () => {
      const name = 'Someone';

      const action = {
        type: SET_NAME,
        param: name,
      };

      const expectedState = Object.assign({}, defaultState, { player: name });
      expect(reducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('Action type ADD_SHIP', () => {
    it('Should change the parameters passed', () => {
      const changes = {
        playerBoard: Array(10).fill('Random thing'),
      };

      const action = {
        type: ADD_SHIP,
        param: changes,
      };

      const expectedState = Object.assign({}, otherState, changes);
      expect(reducer(otherState, action)).toEqual(expectedState);
    });
  });

  describe('Action type PLAY', () => {
    it('Should change the game state and update the player and oponent board', () => {
      const changes = {
        playerBoard: Array(10).fill('Random thing'),
        oponentBoard: Array(10).fill('Other thing'),
      };

      const action = {
        type: PLAY,
        param: changes,
      };

      const expectedState = Object.assign({}, otherState, changes, { state: STATES.PLAYING });
      expect(reducer(otherState, action)).toEqual(expectedState);
    });
  });

  describe('Action type SURRENDER', () => {
    it('Should change game state, the winner and mark that the player surrendered', () => {
      const action = {
        type: SURRENDER,
      };

      const changes = {
        state: STATES.FINISHED,
        winner: PLAYERS.OPONENT,
        surrendered: true,
      };

      const expectedState = Object.assign({}, otherState, changes);
      expect(reducer(otherState, action)).toEqual(expectedState);
    });
  });

  describe('Action type SHOOT', () => {
    it('Should change the parameters passed', () => {
      const changes = {
        playerBoard: Array(10).fill('Random thing'),
      };

      const action = {
        type: SHOOT,
        param: changes,
      };

      const expectedState = Object.assign({}, otherState, changes);
      expect(reducer(otherState, action)).toEqual(expectedState);
    });
  });

  describe('Action type OPONENT_TURN', () => {
    it('Should change the parameters passed', () => {
      const changes = {
        playerBoard: Array(10).fill('Random thing'),
      };

      const action = {
        type: OPONENT_TURN,
        param: changes,
      };

      const expectedState = Object.assign({}, otherState, changes);
      expect(reducer(otherState, action)).toEqual(expectedState);
    });
  });
});
