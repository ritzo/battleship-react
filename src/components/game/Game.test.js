import React from 'react';
import { shallow } from 'enzyme';

import Game from './Game';

import { PLAYERS, STATES } from '../../constants/Constants';

describe('Game', () => {
  it('Snapshot', () => {
    const player = 'someone';
    const next = PLAYERS.PLAYER;
    const state = STATES.PLAYING;
    const actions = {
      surrender() {},
    };

    const enzymeWrapper = shallow(
      <Game player={player} next={next} state={state} actions={actions} />,
    );

    expect(enzymeWrapper).toMatchSnapshot();
  });
});
