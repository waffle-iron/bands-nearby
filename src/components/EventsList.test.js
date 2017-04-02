import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import EventsList from './EventsList';
import EventsListEntry from './EventsListEntry'
import mockData from '../utilities/testMockData.js';

test('EventsList should render an EventsListEntry card for each concert in data-set', () => {
  const component = shallow(<EventsList concerts={mockData} />);
  expect(component.find(EventsListEntry).length).toEqual(mockData.length);
});
