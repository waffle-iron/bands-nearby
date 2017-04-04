import { SET_SEARCH_TERM, FETCH_CONCERT_DATA } from './actions'

const DEFAULT_STATE = {
  searchTerm: '',
  concertData: {}
}

const setSearchTerm = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {searchTerm: action.searchTerm})
  return newState
}

const getConcertData = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {concertData: action.concertData})
  return newState
}
// const getConcertData = (state, action) => {
//   const newconcertData = {}
//   Object.assign(newconcertData, state.concertData, {[action.imdbID]: action.concertData})
//   const newState = {}
//   Object.assign(newState, state, {concertData: newconcertData})
//   return newState
// }

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return setSearchTerm(state, action)
    case FETCH_CONCERT_DATA:
      return getConcertData(state, action)
    default:
      return state
  }
}

export default rootReducer
