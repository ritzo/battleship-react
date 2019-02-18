import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import HomeContainer from './HomeContainer';
import {
  SQUARE_STATES, SHIPS, STATES,
} from '../../constants/Constants';

const initialState = {
  player: 'Player',
  editableBoard: Array(10).fill([]).map((() => Array(10).fill(SQUARE_STATES.EMPTY))),
  playerBoard: Array(10).fill([]).map((() => Array(10).fill(SQUARE_STATES.EMPTY))),
  playerBoardLast: null,
  oponentBoard: Array(10).fill([]).map((() => Array(10).fill(SQUARE_STATES.EMPTY))),
  oponentBoardLast: null,
  availableShips: [...SHIPS],
  state: STATES.OPEN,
  next: null,
  winner: null,
  surrendered: false,
};
const mockStore = configureStore();

let wrapper;
let store;

beforeEach(() => {
  store = mockStore(initialState);
  wrapper = shallow(
    <Provider store={store}>
      <HomeContainer />
    </Provider>,
  );
});

describe('HomeContainer', () => {
  it('Snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
