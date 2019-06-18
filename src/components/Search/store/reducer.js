import types from './types'

const SEARCH_HISTORY_KEY = '__SEARCH__'
const storage = window.localStorage
const searchHistory = JSON.parse(storage[SEARCH_HISTORY_KEY] || "[]")


const defaultState = {
  hotKey: [],
  searchHistory
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_HOT_KEYWORD:
      return Object.assign({}, state, {
        hotKey: action.hotKey
      })
    case types.SET_SEARCH_HISTORY:
      storage[SEARCH_HISTORY_KEY] = JSON.stringify(action.searchHistory)
      return Object.assign({}, state, {
        searchHistory: action.searchHistory
      })
    default:
      return state
  }
}
