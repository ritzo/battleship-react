import {
  setupBoard,
  setName,
  surrender,
  addShip,
  play,
  oponentTurn,
  shoot,
} from './index';

import {
  PLAYERS,
  STATES,
  SQUARE_STATES,
  ORIENTATION,
  SHIPS,
} from '../constants/Constants';
import {
  SETUP_BOARD,
  SET_NAME,
  ADD_SHIP,
  PLAY,
  SURRENDER,
  SHOOT,
  OPONENT_TURN,
} from '../constants/ActionTypes';

function generateBoard(defaultState) {
  return Array(10).fill('').map(() => Array(10).fill(defaultState));
}

function setBoardSquares(board, state, points) {
  points.forEach((point) => {
    const { x, y } = point;
    // eslint-disable-next-line no-param-reassign
    board[y][x] = state;
  });
}

function countSquares(board, states) {
  let totalShips = 0;
  board.forEach((eachColumn) => {
    eachColumn.forEach((eachSquare) => {
      if (states.indexOf(eachSquare) !== -1) {
        totalShips += 1;
      }
    });
  });

  return totalShips;
}

function getTotalShips() {
  let total = 0;
  SHIPS.forEach((ship) => {
    total += ship;
  });

  return total;
}

describe('Actions', () => {
  describe('SetupBoard', () => {
    it('Should trigger the correct action', () => {
      const param = { some: 'value' };

      expect(setupBoard(param)).toEqual({ type: SETUP_BOARD, param });
    });
  });

  describe('SetName', () => {
    it('Should trigger the correct action', () => {
      const param = { some: 'value' };

      expect(setName(param)).toEqual({ type: SET_NAME, param });
    });
  });

  describe('Surrender', () => {
    it('Should trigger the correct action', () => {
      const param = { some: 'value' };

      expect(surrender(param)).toEqual({ type: SURRENDER, param });
    });
  });

  describe('AddShip', () => {
    it('Should add ship correctly horizontally', () => {
      const param = {
        orientation: ORIENTATION.HORIZONTAL,
        x: 1,
        y: 2,
      };
      const dispatch = jest.fn();
      const getState = () => ({
        editableBoard: generateBoard(SQUARE_STATES.EMPTY),
        availableShips: [2, 3],
      });

      addShip(param)(dispatch, getState);

      const expectedBoard = generateBoard(SQUARE_STATES.EMPTY);
      setBoardSquares(expectedBoard, SQUARE_STATES.SHIP, [
        { x: 1, y: 2 }, { x: 2, y: 2 },
      ]);
      setBoardSquares(expectedBoard, SQUARE_STATES.INVALID, [
        { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
        { x: 0, y: 2 }, { x: 3, y: 2 },
        { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
      ]);
      const expectedParam = {
        editableBoard: expectedBoard,
        availableShips: [3],
      };
      expect(dispatch).toHaveBeenCalledWith({ type: ADD_SHIP, param: expectedParam });
    });

    it('Should add ship correctly vertically', () => {
      const param = {
        orientation: ORIENTATION.VERTICAL,
        x: 1,
        y: 2,
      };
      const dispatch = jest.fn();
      const getState = () => ({
        editableBoard: generateBoard(SQUARE_STATES.EMPTY),
        availableShips: [2, 3],
      });

      addShip(param)(dispatch, getState);

      const expectedBoard = generateBoard(SQUARE_STATES.EMPTY);
      setBoardSquares(expectedBoard, SQUARE_STATES.SHIP, [
        { x: 1, y: 2 }, { x: 1, y: 3 },
      ]);
      setBoardSquares(expectedBoard, SQUARE_STATES.INVALID, [
        { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 },
        { x: 0, y: 2 }, { x: 2, y: 2 },
        { x: 0, y: 3 }, { x: 2, y: 3 },
        { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 },
      ]);
      const expectedParam = {
        editableBoard: expectedBoard,
        availableShips: [3],
      };
      expect(dispatch).toHaveBeenCalledWith({ type: ADD_SHIP, param: expectedParam });
    });

    it('Should add ship correctly in a corner', () => {
      const param = {
        orientation: ORIENTATION.VERTICAL,
        x: 0,
        y: 0,
      };
      const dispatch = jest.fn();
      const getState = () => ({
        editableBoard: generateBoard(SQUARE_STATES.EMPTY),
        availableShips: [2],
      });

      addShip(param)(dispatch, getState);

      const expectedBoard = generateBoard(SQUARE_STATES.EMPTY);
      setBoardSquares(expectedBoard, SQUARE_STATES.SHIP, [
        { x: 0, y: 0 }, { x: 0, y: 1 },
      ]);
      setBoardSquares(expectedBoard, SQUARE_STATES.INVALID, [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 2 }, { x: 1, y: 2 },
      ]);
      const expectedParam = {
        editableBoard: expectedBoard,
        availableShips: [],
      };
      expect(dispatch).toHaveBeenCalledWith({ type: ADD_SHIP, param: expectedParam });
    });

    it('Should not trigger the action when square is occupied', () => {
      const param = {
        orientation: ORIENTATION.HORIZONTAL,
        x: 1,
        y: 2,
      };
      const board = generateBoard(SQUARE_STATES.EMPTY);
      setBoardSquares(board, SQUARE_STATES.SHIP, [{ x: 2, y: 2 }]);

      const state = {
        editableBoard: board,
        availableShips: [2, 3],
      };

      const dispatch = jest.fn();
      const getState = () => state;

      const action = addShip(param)(dispatch, getState);

      expect(action).toBeNull();
      expect(dispatch).not.toHaveBeenCalled();
    });

    it('Should not trigger the action when the ship falls of the board', () => {
      const param = {
        orientation: ORIENTATION.HORIZONTAL,
        x: 9,
        y: 2,
      };

      const state = {
        editableBoard: generateBoard(SQUARE_STATES.EMPTY),
        availableShips: [2, 3],
      };

      const dispatch = jest.fn();
      const getState = () => state;

      const action = addShip(param)(dispatch, getState);

      expect(action).toBeNull();
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe('Play', () => {
    it('Should trigger the correct action with the oponent board created', () => {
      const editableBoard = generateBoard(SQUARE_STATES.EMPTY);
      setBoardSquares(editableBoard, SQUARE_STATES.SHIP, [
        { x: 1, y: 2 }, { x: 2, y: 2 },
      ]);
      setBoardSquares(editableBoard, SQUARE_STATES.INVALID, [
        { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
        { x: 0, y: 2 }, { x: 3, y: 2 },
        { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
      ]);

      const dispatch = jest.fn();
      const getState = () => ({ editableBoard });

      play()(dispatch, getState);

      const expectedBoard = generateBoard(SQUARE_STATES.EMPTY);
      setBoardSquares(expectedBoard, SQUARE_STATES.SHIP, [
        { x: 1, y: 2 }, { x: 2, y: 2 },
      ]);

      expect(dispatch).toHaveBeenCalled();

      const { type, param } = dispatch.mock.calls[0][0];
      expect(type).toEqual(PLAY);
      expect(param.playerBoard).toEqual(expectedBoard);

      // Test that the amount of ships  in the oponent board is the correct one.
      expect(getTotalShips()).toEqual(countSquares(param.oponentBoard, [SQUARE_STATES.SHIP]));
    });
  });

  describe('OponentTurn', () => {
    it('Should not trigger the action when its the state is not "playing"', () => {
      const playerBoard = generateBoard(SQUARE_STATES.EMPTY);

      const dispatch = jest.fn();
      const getState = () => ({
        playerBoard,
        state: STATES.OPEN,
        next: PLAYERS.OPONENT,
        winner: null,
      });

      oponentTurn()(dispatch, getState);

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('Should not trigger the action when its the player\'s turn', () => {
      const playerBoard = generateBoard(SQUARE_STATES.EMPTY);

      const dispatch = jest.fn();
      const getState = () => ({
        playerBoard,
        state: STATES.PLAYING,
        next: PLAYERS.PLAYER,
        winner: null,
      });

      oponentTurn()(dispatch, getState);

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('Should trigger the correct action', () => {
      const playerBoard = generateBoard(SQUARE_STATES.EMPTY);
      setBoardSquares(playerBoard, SQUARE_STATES.SHIP, [
        { x: 1, y: 2 }, { x: 2, y: 2 },
      ]);

      const dispatch = jest.fn();
      const getState = () => ({
        playerBoard,
        state: STATES.PLAYING,
        next: PLAYERS.OPONENT,
        winner: null,
      });

      oponentTurn()(dispatch, getState);

      expect(dispatch).toHaveBeenCalled();

      const { type, param } = dispatch.mock.calls[0][0];
      expect(type).toEqual(OPONENT_TURN);
      expect(param.playerBoard).toEqual(expect.any(Array));
      expect(param.next).toEqual(PLAYERS.PLAYER);
      expect(param.winner).toBeNull();
      expect(param.state).toEqual(STATES.PLAYING);

      const totalShoots = countSquares(
        param.playerBoard, [SQUARE_STATES.SHOOT_MISS, SQUARE_STATES.SHOOT_SHIP],
      );

      // Test that the amount of ships  in the player board is the correct one.
      expect(totalShoots).toEqual(1);
    });

    it('Should shoot a specific square', () => {
      const playerBoard = generateBoard(SQUARE_STATES.EMPTY);
      setBoardSquares(playerBoard, SQUARE_STATES.SHIP, [
        { x: 2, y: 2 }, { x: 3, y: 2 },
      ]);
      setBoardSquares(playerBoard, SQUARE_STATES.SHOOT_SHIP, [
        { x: 1, y: 2 },
      ]);
      setBoardSquares(playerBoard, SQUARE_STATES.SHOOT_MISS, [
        { x: 0, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 3 },
      ]);

      const dispatch = jest.fn();
      const getState = () => ({
        playerBoard,
        state: STATES.PLAYING,
        next: PLAYERS.OPONENT,
        winner: null,
      });

      oponentTurn()(dispatch, getState);

      const expectedBoard = generateBoard(SQUARE_STATES.EMPTY);
      setBoardSquares(expectedBoard, SQUARE_STATES.SHIP, [
        { x: 3, y: 2 },
      ]);
      setBoardSquares(expectedBoard, SQUARE_STATES.SHOOT_SHIP, [
        { x: 1, y: 2 }, { x: 2, y: 2 },
      ]);
      setBoardSquares(expectedBoard, SQUARE_STATES.SHOOT_MISS, [
        { x: 0, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 3 },
      ]);

      expect(dispatch).toHaveBeenCalled();

      const { type, param } = dispatch.mock.calls[0][0];
      expect(type).toEqual(OPONENT_TURN);
      expect(param.playerBoard).toEqual(expectedBoard);
      expect(param.next).toEqual(PLAYERS.PLAYER);
      expect(param.winner).toBeNull();
      expect(param.state).toEqual(STATES.PLAYING);

      const totalShoots = countSquares(
        param.playerBoard, [SQUARE_STATES.SHOOT_MISS, SQUARE_STATES.SHOOT_SHIP],
      );

      // Test that the amount of ships in the player board is the correct one.
      expect(totalShoots).toEqual(5);
    });

    it('Should handle correctly the winning condition', () => {
      const playerBoard = generateBoard(SQUARE_STATES.EMPTY);
      setBoardSquares(playerBoard, SQUARE_STATES.SHIP, [
        { x: 2, y: 2 },
      ]);
      setBoardSquares(playerBoard, SQUARE_STATES.SHOOT_SHIP, [
        { x: 1, y: 2 },
      ]);
      setBoardSquares(playerBoard, SQUARE_STATES.SHOOT_MISS, [
        { x: 0, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 3 },
      ]);

      const dispatch = jest.fn();
      const getState = () => ({
        playerBoard,
        state: STATES.PLAYING,
        next: PLAYERS.OPONENT,
        winner: null,
      });

      oponentTurn()(dispatch, getState);

      const expectedBoard = generateBoard(SQUARE_STATES.EMPTY);
      setBoardSquares(expectedBoard, SQUARE_STATES.SHIP_SUNKEN, [
        { x: 1, y: 2 }, { x: 2, y: 2 },
      ]);
      setBoardSquares(expectedBoard, SQUARE_STATES.SHOOT_MISS, [
        { x: 0, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 3 },
      ]);
      setBoardSquares(expectedBoard, SQUARE_STATES.INVALID, [
        { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
        { x: 3, y: 2 },
        { x: 0, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
      ]);

      expect(dispatch).toHaveBeenCalled();

      const { type, param } = dispatch.mock.calls[0][0];
      expect(type).toEqual(OPONENT_TURN);
      expect(param.playerBoard).toEqual(expectedBoard);
      expect(param.next).toEqual(PLAYERS.PLAYER);
      expect(param.winner).toBe(PLAYERS.OPONENT);
      expect(param.state).toEqual(STATES.FINISHED);

      const totalShoots = countSquares(
        param.playerBoard, [
          SQUARE_STATES.SHOOT_MISS,
          SQUARE_STATES.SHOOT_SHIP,
          SQUARE_STATES.SHIP_SUNKEN,
        ],
      );

      // Test that the amount of ships in the player board is the correct one.
      expect(totalShoots).toEqual(5);
    });
  });

  describe('Shoot', () => {
    it('Should not trigger the action when its the state is not "playing"', () => {
      const oponentBoard = generateBoard(SQUARE_STATES.EMPTY);

      const dispatch = jest.fn();
      const getState = () => ({
        oponentBoard,
        state: STATES.OPEN,
        next: PLAYERS.PLAYER,
        winner: null,
      });

      shoot({ x: 1, y: 3 })(dispatch, getState);

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('Should not trigger the action when its the oponent\'s turn', () => {
      const oponentBoard = generateBoard(SQUARE_STATES.EMPTY);

      const dispatch = jest.fn();
      const getState = () => ({
        oponentBoard,
        state: STATES.PLAYING,
        next: PLAYERS.OPONENT,
        winner: null,
      });

      shoot({ x: 1, y: 3 })(dispatch, getState);

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('Should trigger the correct action', () => {
      const oponentBoard = generateBoard(SQUARE_STATES.EMPTY);
      setBoardSquares(oponentBoard, SQUARE_STATES.SHIP, [
        { x: 1, y: 2 }, { x: 2, y: 2 },
      ]);

      const dispatch = jest.fn();
      const getState = () => ({
        oponentBoard,
        state: STATES.PLAYING,
        next: PLAYERS.PLAYER,
        winner: null,
      });

      shoot({ x: 1, y: 3 })(dispatch, getState);

      expect(dispatch).toHaveBeenCalled();

      const { type, param } = dispatch.mock.calls[0][0];
      expect(type).toEqual(SHOOT);
      expect(param.oponentBoard).toEqual(expect.any(Array));
      expect(param.next).toEqual(PLAYERS.OPONENT);
      expect(param.winner).toBeNull();
      expect(param.state).toEqual(STATES.PLAYING);

      const totalShoots = countSquares(
        param.oponentBoard, [SQUARE_STATES.SHOOT_MISS, SQUARE_STATES.SHOOT_SHIP],
      );

      // Test that the amount of ships  in the player board is the correct one.
      expect(totalShoots).toEqual(1);
    });

    it('Should mark correctly the square', () => {
      const oponentBoard = generateBoard(SQUARE_STATES.EMPTY);
      setBoardSquares(oponentBoard, SQUARE_STATES.SHIP, [
        { x: 2, y: 2 }, { x: 3, y: 2 },
      ]);
      setBoardSquares(oponentBoard, SQUARE_STATES.SHOOT_SHIP, [
        { x: 1, y: 2 },
      ]);
      setBoardSquares(oponentBoard, SQUARE_STATES.SHOOT_MISS, [
        { x: 0, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 3 },
      ]);

      const dispatch = jest.fn();
      const getState = () => ({
        oponentBoard,
        state: STATES.PLAYING,
        next: PLAYERS.PLAYER,
        winner: null,
      });

      shoot({ x: 2, y: 2 })(dispatch, getState);

      const expectedBoard = generateBoard(SQUARE_STATES.EMPTY);
      setBoardSquares(expectedBoard, SQUARE_STATES.SHIP, [
        { x: 3, y: 2 },
      ]);
      setBoardSquares(expectedBoard, SQUARE_STATES.SHOOT_SHIP, [
        { x: 1, y: 2 }, { x: 2, y: 2 },
      ]);
      setBoardSquares(expectedBoard, SQUARE_STATES.SHOOT_MISS, [
        { x: 0, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 3 },
      ]);

      expect(dispatch).toHaveBeenCalled();

      const { type, param } = dispatch.mock.calls[0][0];
      expect(type).toEqual(SHOOT);
      expect(param.oponentBoard).toEqual(expectedBoard);
      expect(param.next).toEqual(PLAYERS.OPONENT);
      expect(param.winner).toBeNull();
      expect(param.state).toEqual(STATES.PLAYING);

      const totalShoots = countSquares(
        param.oponentBoard, [SQUARE_STATES.SHOOT_MISS, SQUARE_STATES.SHOOT_SHIP],
      );

      // Test that the amount of ships in the player board is the correct one.
      expect(totalShoots).toEqual(5);
    });

    it('Should handle correctly the winning condition', () => {
      const oponentBoard = generateBoard(SQUARE_STATES.EMPTY);
      setBoardSquares(oponentBoard, SQUARE_STATES.SHIP, [
        { x: 2, y: 2 },
      ]);
      setBoardSquares(oponentBoard, SQUARE_STATES.SHOOT_SHIP, [
        { x: 1, y: 2 },
      ]);
      setBoardSquares(oponentBoard, SQUARE_STATES.SHOOT_MISS, [
        { x: 0, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 3 },
      ]);

      const dispatch = jest.fn();
      const getState = () => ({
        oponentBoard,
        state: STATES.PLAYING,
        next: PLAYERS.PLAYER,
        winner: null,
      });

      shoot({ x: 2, y: 2 })(dispatch, getState);

      const expectedBoard = generateBoard(SQUARE_STATES.EMPTY);
      setBoardSquares(expectedBoard, SQUARE_STATES.SHIP_SUNKEN, [
        { x: 1, y: 2 }, { x: 2, y: 2 },
      ]);
      setBoardSquares(expectedBoard, SQUARE_STATES.SHOOT_MISS, [
        { x: 0, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 3 },
      ]);
      setBoardSquares(expectedBoard, SQUARE_STATES.INVALID, [
        { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 },
        { x: 3, y: 2 },
        { x: 0, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
      ]);

      expect(dispatch).toHaveBeenCalled();

      const { type, param } = dispatch.mock.calls[0][0];
      expect(type).toEqual(SHOOT);
      expect(param.oponentBoard).toEqual(expectedBoard);
      expect(param.next).toEqual(PLAYERS.OPONENT);
      expect(param.winner).toBe(PLAYERS.PLAYER);
      expect(param.state).toEqual(STATES.FINISHED);

      const totalShoots = countSquares(
        param.oponentBoard, [
          SQUARE_STATES.SHOOT_MISS,
          SQUARE_STATES.SHOOT_SHIP,
          SQUARE_STATES.SHIP_SUNKEN,
        ],
      );

      // Test that the amount of ships in the player board is the correct one.
      expect(totalShoots).toEqual(5);
    });
  });
});
