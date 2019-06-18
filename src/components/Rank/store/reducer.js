import types from './types'

const defaultState = {
  topList: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_TOP_LIST:
      return Object.assign({}, state, {
        topList: action.topList
      })
    default:
      return state
  }
}
