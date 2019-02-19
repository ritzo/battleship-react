import React from 'react';
import { shallow } from 'enzyme';

import Square from './Square';

import { SQUARE_STATES, ORIENTATION } from '../../constants/Constants';

describe('Square', () => {
  it('Snapshot', () => {
    const x = 5;
    const y = 1;
    const matrix = Array(10).fill([]).map((() => Array(10).fill(SQUARE_STATES.EMPTY)));
    const actions = {
      onClickHandler() {},
    };

    const enzymeWrapper = shallow(
      <Square x={x} y={y} matrix={matrix} actions={actions} />,
    );

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('Should trigger action "setupBoard" on left click button', () => {
    const x = 5;
    const y = 1;
    const matrix = Array(10).fill([]).map((() => Array(10).fill(SQUARE_STATES.EMPTY)));
    const actions = {
      onClickHandler: jest.fn(),
    };

    const enzymeWrapper = shallow(
      <Square x={x} y={y} matrix={matrix} actions={actions} />,
    );

    enzymeWrapper.find('button').simulate('click', { type: '', preventDefault: () => {} });

    expect(actions.onClickHandler).toHaveBeenCalledWith(
      { x, y, orientation: ORIENTATION.HORIZONTAL },
    );
  });

  it('Should trigger action "setupBoard" on rigth click button', () => {
    const x = 5;
    const y = 1;
    const matrix = Array(10).fill([]).map((() => Array(10).fill(SQUARE_STATES.EMPTY)));
    const actions = {
      onClickHandler: jest.fn(),
    };

    const enzymeWrapper = shallow(
      <Square x={x} y={y} matrix={matrix} actions={actions} />,
    );

    enzymeWrapper.find('button').simulate('click', { type: 'contextmenu', preventDefault: () => {} });

    expect(actions.onClickHandler).toHaveBeenCalledWith(
      { x, y, orientation: ORIENTATION.VERTICAL },
    );
  });
});
