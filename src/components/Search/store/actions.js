import {getHotKey} from "../../../api/search"
import types from './types'
import {shuffle} from "../../../utils"

export const hotKey = () => async dispatch => {
  let {data} = await getHotKey()
  dispatch({
    type: types.SET_HOT_KEYWORD,
    hotKey: shuffle(data.hotkey)
  })
}

export const searchHistory = searchHistory => ({
  type: types.SET_SEARCH_HISTORY,
  searchHistory
})
