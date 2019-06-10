import types from './types'

const defaultState = {
  slider: [],
  list: []
}

export default (state = defaultState, actions) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch (actions.type) {
    case types.SET_RECOMMEND_SLIDER:
      newState.slider=actions.slider
      return newState
    case types.SET_RECOMMEND_LIST:
      newState.list = actions.list
      return newState
    default:
      return state
  }
}