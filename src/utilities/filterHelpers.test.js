import { findMinMax, filterByCost, filterByTypeahead } from './filterHelpers';
import concertData from './filterHelpersTestMockData';

test('findMinMax should return min and max values from list', () => {
  const expected = [12, 65];
  const result = findMinMax(concertData);
  expect(result).toEqual(expected);
});

test('filterByCost should return concerts priced equal or less than filted value', () => {
  const result = filterByCost(concertData, 12);
  expect(result[0].title).toEqual(['Sex With Eugene']);
  expect(result[1]).toEqual(undefined);
});

test('filterByTypeahead should return concerts that contain matching characters', () => {
  const result = filterByTypeahead(concertData, 'kings');
  expect(result[0].title).toEqual(['White Lies', ' VOWWS']);
  expect(result[1]).toEqual(undefined);
});
