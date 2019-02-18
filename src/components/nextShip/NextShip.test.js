import React from 'react';
import { shallow } from 'enzyme';

import NextShip from './NextShip';

describe('NextShip', () => {
  it('Snapshot', () => {
    const availableShips = [2, 3];

    const enzymeWrapper = shallow(
      <NextShip availableShips={availableShips} />,
    );

    expect(enzymeWrapper).toMatchSnapshot();
  });
});
