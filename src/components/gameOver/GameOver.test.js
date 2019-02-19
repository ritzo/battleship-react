import React from 'react';
import { shallow } from 'enzyme';

import GameOver from './GameOver';

import { PLAYERS, STATES } from '../../constants/Constants';

describe('GameOver', () => {
  it('Snapshot', () => {
    const state = STATES.FINISHED;
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

  it('Should redirect to home when state is "open"', () => {
    const state = STATES.OPEN;
    const winner = PLAYERS.PLAYER;
    const surrendered = false;
    const actions = {
      setupBoard() {},
    };

    const enzymeWrapper = shallow(
      <GameOver state={state} winner={winner} surrendered={surrendered} actions={actions} />,
    );

    expect(enzymeWrapper.find('Redirect')).toBeDefined();
    expect(enzymeWrapper.find('Redirect').props().to).toBe('/');
  });

  it('Should redirect to home when state is "playing"', () => {
    const state = STATES.PLAYING;
    const winner = PLAYERS.PLAYER;
    const surrendered = false;
    const actions = {
      setupBoard() {},
    };

    const enzymeWrapper = shallow(
      <GameOver state={state} winner={winner} surrendered={surrendered} actions={actions} />,
    );

    expect(enzymeWrapper.find('Redirect')).toBeDefined();
    expect(enzymeWrapper.find('Redirect').props().to).toBe('/game');
  });

  it('Should trigger action "setupBoard" on button click', () => {
    const state = STATES.FINISHED;
    const winner = PLAYERS.PLAYER;
    const surrendered = false;
    const actions = {
      setupBoard: jest.fn(),
    };

    const enzymeWrapper = shallow(
      <GameOver state={state} winner={winner} surrendered={surrendered} actions={actions} />,
    );

    enzymeWrapper.find('button').simulate('click');

    expect(actions.setupBoard).toHaveBeenCalled();
  });
});
