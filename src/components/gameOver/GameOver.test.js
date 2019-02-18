import React from 'react';
import { shallow } from 'enzyme';

import GameOver from './GameOver';

import { PLAYERS, STATES } from '../../constants/Constants';

describe('GameOver', () => {
  it('Snapshot', () => {
    const state = STATES.PLAYING;
    const winner = PLAYERS.PLAYER;
    const surrendered = false;
    const actions = {
      setupBoard() {},
    };

    const enzymeWrapper = shallow(
      <GameOver state={state} winner={winner} surrendered={surrendered} actions={actions} />,
    );

    expect(enzymeWrapper).toMatchSnapshot();
  });
});
