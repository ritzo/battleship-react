import React from 'react';
import { shallow } from 'enzyme';

import Board from './Board';

describe('Board', () => {
  it('Snapshot', () => {
    const enzymeWrapper = shallow(<Board title="test board" type="someType" isNext={false} />);

    expect(enzymeWrapper).toMatchSnapshot();
  });
});
