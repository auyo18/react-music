import {combineReducers} from 'redux'
import recommendReducer from '../components/Recommend/store/reducer'
import singerReducer from '../components/Singer/store/reducer'
import playerReducer from '../components/Player/store/reducer'

const reducer = combineReducers({
  recommend: recommendReducer,
  singer: singerReducer,
  player: playerReducer
})

export default reducer
