import {recommendList, recommendSlider} from "../../../api/song"
import types from './types'
import {fromJS} from 'immutable'

export const getRecommendSlider = () => {
  return async dispatch => {
    let {data} = await recommendSlider()
    dispatch({
      type: types.SET_RECOMMEND_SLIDER,
      slider: fromJS(data.slider)
    })
  }
}

export const getRecommendList = () => {
  return async dispatch => {
    let {data} = await recommendList()
    dispatch({
      type: types.SET_RECOMMEND_LIST,
      list: data.list
    })
  }
}
