import types from './types'
import {topList} from "../../../api/rank"

export const getTopList = () => {
  return async dispatch => {
    let {data} = await topList()
    dispatch({
      type: types.SET_TOP_LIST,
      topList: data.topList
    })
  }
}
