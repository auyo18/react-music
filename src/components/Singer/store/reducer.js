import types from './types'

const defaultState = {
  list: [],
  shortCutList: []
}

export default (state = defaultState, actions) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch (actions.type) {
    case types.SET_SINGER_LIST:
      newState.list = actions.list
      return newState
    case types.SET_SHORT_CUT:
      newState.shortCutList = actions.shortCut
      return newState
    default:
      return state
  }
}
