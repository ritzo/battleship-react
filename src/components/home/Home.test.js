import React from 'react';
import { shallow } from 'enzyme';

import Home from './Home';

import { STATES } from '../../constants/Constants';

describe('Home', () => {
  it('Snapshot', () => {
    const player = 'someone';
    const availableShips = [2, 3];
    const state = STATES.PLAYING;
    const actions = {
      play() {},
    };

    const enzymeWrapper = shallow(
      <Home player={player} availableShips={availableShips} state={state} actions={actions} />,
    );

    expect(enzymeWrapper).toMatchSnapshot();
  });
});
