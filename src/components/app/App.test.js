import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  it('Snapshot', () => {
    const enzymeWrapper = shallow(<App />);

    const component = enzymeWrapper.dive();

    expect(component).toMatchSnapshot();
  });
});
