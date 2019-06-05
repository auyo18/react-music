import types from './types'
import {fromJS} from 'immutable'

const defaultState = fromJS({
  slider: [],
  list: []
})

export default (state = defaultState, actions) => {
  switch (actions.type) {
    case types.SET_RECOMMEND_SLIDER:
      return state.set('slider', fromJS(actions.slider))
    case types.SET_RECOMMEND_LIST:
      return state.set('list', fromJS(actions.list))
    default:
      return state
  }
}
