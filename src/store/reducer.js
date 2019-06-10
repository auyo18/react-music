import {combineReducers} from 'redux'
import recommendReducer from '../components/Recommend/store/reducer'
import singerReducer from '../components/Singer/store/reducer'

const reducer = combineReducers({
  recommend: recommendReducer,
  singer: singerReducer
})

export default reducer
