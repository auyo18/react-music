import {recommendList, recommendSlider} from "../../../api/recommend"
import types from './types'

export const getRecommendSlider = () => {
  return async dispatch => {
    let {data} = await recommendSlider()
    dispatch({
      type: types.SET_RECOMMEND_SLIDER,
      slider: data.slider
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
