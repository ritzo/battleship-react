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

  it('Should trigger action "play" on button click', () => {
    const player = 'someone';
    const next = PLAYERS.PLAYER;
    const state = STATES.PLAYING;
    const actions = {
      surrender: jest.fn(),
    };

    const enzymeWrapper = shallow(
      <Game player={player} next={next} state={state} actions={actions} />,
    );

    enzymeWrapper.find('button').simulate('click');

    expect(actions.surrender).toHaveBeenCalled();
  });

  it('Should redirect to home when state is "open"', () => {
    const player = 'someone';
    const next = PLAYERS.PLAYER;
    const state = STATES.OPEN;
    const actions = {
      surrender: jest.fn(),
    };

    const enzymeWrapper = shallow(
      <Game player={player} next={next} state={state} actions={actions} />,
    );

    expect(enzymeWrapper.find('Redirect')).toBeDefined();
    expect(enzymeWrapper.find('Redirect').props().to).toBe('/');
  });

  it('Should redirect to gameOver when state is "finished"', () => {
    const player = 'someone';
    const next = PLAYERS.PLAYER;
    const state = STATES.FINISHED;
    const actions = {
      surrender: jest.fn(),
    };

    const enzymeWrapper = shallow(
      <Game player={player} next={next} state={state} actions={actions} />,
    );

    expect(enzymeWrapper.find('Redirect')).toBeDefined();
    expect(enzymeWrapper.find('Redirect').props().to).toBe('/gameOver');
  });
});
