import React from 'react';
import AppLogo from './AppLogo';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json'

test('Logo Snapshot test', () => {
  const component = shallow(<AppLogo />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
})
