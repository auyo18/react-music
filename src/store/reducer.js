import {combineReducers} from 'redux'
import recommendReducer from '../components/Recommend/store/reducer'
import singerReducer from '../components/Singer/store/reducer'
import playerReducer from '../components/Player/store/reducer'
import topListReducer from '../components/Rank/store/reducer'
import searchReducer from '../components/Search/store/reducer'

const reducer = combineReducers({
  recommend: recommendReducer,
  singer: singerReducer,
  player: playerReducer,
  topList: topListReducer,
  search: searchReducer
})

export default reducer
