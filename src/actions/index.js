import * as types from '../constants/ActionTypes';

export const setupBoard = param => ({ type: types.SETUP_BOARD, param });
const setNamePriv = param => ({ type: types.SET_NAME, param });
export const addShip = param => ({ type: types.ADD_SHIP, param });
export const play = param => ({ type: types.PLAY, param });
export const surrender = param => ({ type: types.SURRENDER, param });
export const shoot = param => ({ type: types.SHOOT, param });
export const oponentTurn = param => ({ type: types.OPONENT_TURN, param });


export const setName = name => (dispatch, getState) => {
  // Temp function
  if (getState().player) {
    dispatch(setNamePriv(name));
  }
};
