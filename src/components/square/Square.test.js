import React from 'react';
import { shallow } from 'enzyme';

import Square from './Square';

import { SQUARE_STATES } from '../../constants/Constants';

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
});
