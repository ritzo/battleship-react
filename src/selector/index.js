import { createSelector } from 'reselect';

const getState = state => state;

export const getGameData = createSelector(
  [getState],
  state => state,
);

export const editorGameData = createSelector(
  [
    state => state.player,
    state => state.availableShips,
  ],
  (player, availableShips) => ({
    player,
    availableShips,
  }),
);

export const editorBoardData = createSelector(
  [
    state => state.editableBoard,
    state => state.availableShips,
  ],
  (editableBoard, availableShips) => ({
    matrix: editableBoard,
    availableShips,
  }),
);

export const playerBoardData = createSelector(
  [
    state => state.playerBoard,
    state => state.oponentBoard,
  ],
  (playerBoard, oponentBoard) => ({
    playerBoard,
    oponentBoard,
  }),
);

export const oponentBoardData = createSelector(
  [
    state => state.playerBoard,
    state => state.oponentBoard,
  ],
  (playerBoard, oponentBoard) => ({
    playerBoard,
    oponentBoard,
  }),
);
