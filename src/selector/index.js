import { createSelector } from 'reselect';
import { PLAYERS } from '../constants/Constants';

const getState = state => state;

export const getGameData = createSelector(
  [getState],
  state => state,
);

export const gameData = createSelector(
  [
    state => state.player,
    state => state.next,
    state => state.state,
  ],
  (player, next, state) => ({
    player,
    next,
    state,
  }),
);

export const gameOverData = createSelector(
  [
    state => state.player,
    state => state.state,
    state => state.winner,
    state => state.playerBoard,
    state => state.oponentBoard,
  ],
  (player, state, winner, playerBoard, oponentBoard) => ({
    player,
    state,
    winner,
    playerBoard,
    oponentBoard,
  }),
);

export const homeData = createSelector(
  [
    state => state.player,
    state => state.availableShips,
    state => state.state,
  ],
  (player, availableShips, state) => ({
    player,
    availableShips,
    state,
  }),
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

export const editorSquaredData = createSelector(
  [
    state => state.editableBoard,
  ],
  editableBoard => ({
    matrix: editableBoard,
  }),
);

export const playerSquaredData = createSelector(
  [
    state => state.playerBoard,
  ],
  playerBoard => ({
    matrix: playerBoard,
  }),
);

export const oponentSquaredData = createSelector(
  [
    state => state.oponentBoard,
  ],
  oponentBoard => ({
    matrix: oponentBoard,
  }),
);

export const editorBoardData = createSelector(
  [],
  () => ({
    isNext: false,
  }),
);

export const playerBoardData = createSelector(
  [
    state => state.next,
  ],
  next => ({
    isNext: (next === PLAYERS.OPONENT),
  }),
);

export const oponentBoardData = createSelector(
  [
    state => state.next,
  ],
  next => ({
    isNext: (next === PLAYERS.PLAYER),
  }),
);
