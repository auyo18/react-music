import types from './types'

const defaultState = {
  list: [],
  shortCutList: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_SINGER_LIST:
      return Object.assign({}, state, {
        list: action.list
      })
    case types.SET_SHORT_CUT:
      return Object.assign({}, state, {
        shortCutList: action.shortCut
      })
    default:
      return state
  }
}
