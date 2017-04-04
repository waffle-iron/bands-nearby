import { SET_SEARCH_TERM, FETCH_CONCERT_DATA } from './actions';
import get from './utilities/axiosHelpers.js';

export function setSearchTerm (searchTerm) {
  return { type: SET_SEARCH_TERM, searchTerm }
}

export function getConcertData (imdbID, concertData) {
  console.log('CALLED getConcertData')
  return { type: FETCH_CONCERT_DATA, imdbID, concertData }
}

export function fetchConcertData (url) {
  return function (dispatch, getState) {
    get(url, (data) => dispatch(getConcertData('concertData', data)));
  }
};
