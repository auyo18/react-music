import {combineReducers} from 'redux-immutable'
import recommendReducer from '../components/Recommend/store/reducer'

const reducer = combineReducers({
  recommend: recommendReducer
})

export default reducer
