import { createSelector } from 'reselect';

const getState = state => state;

export default createSelector(
  [getState],
  state => state,
);
