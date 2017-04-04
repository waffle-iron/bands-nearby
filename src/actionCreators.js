import { SET_SEARCH_TERM, FETCH_CONCERT_DATA } from './actions';
import get from './utilities/axiosHelpers.js';
import { sortByDate } from './utilities/filterHelpers';
import { findMinMax } from './utilities/filterHelpers'


export function setSearchTerm (searchTerm) {
  return { type: SET_SEARCH_TERM, searchTerm }
}
// export function setCostMin (concerts) {
//   return { type: SET_SEARCH_TERM, findMinMax(concerts)[0] }
// }

export function getConcertData (imdbID, concertData) {
  return { type: FETCH_CONCERT_DATA, imdbID, concertData }
}

export function fetchConcertData (url) {
  return function (dispatch, getState) {
    get(url, (data) => dispatch(getConcertData('concertData', sortByDate(data))));
  }
};
