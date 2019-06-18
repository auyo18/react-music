import types from './types'

const defaultState = {
  slider: [],
  list: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_RECOMMEND_SLIDER:
      return Object.assign({}, state, {
        slider: action.slider
      })
    case types.SET_RECOMMEND_LIST:
      return Object.assign({}, state, {
        list: action.list
      })
    default:
      return state
  }
}
