import React from 'react';
import { shallow } from 'enzyme';

import Home from './Home';

import { STATES } from '../../constants/Constants';

describe('Home', () => {
  it('Snapshot', () => {
    const player = 'someone';
    const availableShips = [2, 3];
    const state = STATES.OPEN;
    const actions = {
      play() {},
      setName() {},
    };

    const enzymeWrapper = shallow(
      <Home player={player} availableShips={availableShips} state={state} actions={actions} />,
    );

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('Should trigger action "setName" on input change', () => {
    const player = 'someone';
    const availableShips = [2, 3];
    const state = STATES.OPEN;
    const actions = {
      play: jest.fn(),
      setName: jest.fn(),
    };

    const enzymeWrapper = shallow(
      <Home player={player} availableShips={availableShips} state={state} actions={actions} />,
    );

    enzymeWrapper.find('input').simulate('change', { target: { value: player } });

    expect(actions.setName).toHaveBeenCalledWith(player);
  });

  it('Should trigger action "play" on button click', () => {
    const player = 'someone';
    const availableShips = [2, 3];
    const state = STATES.OPEN;
    const actions = {
      play: jest.fn(),
      setName: jest.fn(),
    };

    const enzymeWrapper = shallow(
      <Home player={player} availableShips={availableShips} state={state} actions={actions} />,
    );

    enzymeWrapper.find('button').simulate('click');

    expect(actions.play).toHaveBeenCalled();
  });

  it('Should be enabled the buton "play" while there are no available ships', () => {
    const player = 'someone';
    const availableShips = [];
    const state = STATES.OPEN;
    const actions = {
      play: jest.fn(),
      setName: jest.fn(),
    };

    const enzymeWrapper = shallow(
      <Home player={player} availableShips={availableShips} state={state} actions={actions} />,
    );

    expect(enzymeWrapper.find('button').props().disabled).toBe(false);
  });

  it('Should be disabled the buton "play" while there are available ships', () => {
    const player = 'someone';
    const availableShips = [2, 3];
    const state = STATES.OPEN;
    const actions = {
      play: jest.fn(),
      setName: jest.fn(),
    };

    const enzymeWrapper = shallow(
      <Home player={player} availableShips={availableShips} state={state} actions={actions} />,
    );

    expect(enzymeWrapper.find('button').props().disabled).toBe(true);
  });
});
