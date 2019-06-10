import types from './types'
import {singerList} from "../../../api/singer"
import CreateSinger from "../../../utils/singer"
import pinyin from "pinyin"

const HOT_NAME = '热门'
const HOT_SINGER_LENGTH = 10

export const getSingerList = () => {
  return async dispatch => {
    let {singerList: {data: {singerlist}}} = await singerList()
    dispatch({
      type: types.SET_SINGER_LIST,
      list: normalizeSinger(singerlist, dispatch)
    })
  }
}

export const shortCutList = shortCut => ({
  type: types.SET_SHORT_CUT,
  shortCut
})

const normalizeSinger = (list, dispatch) => {
  if (!list.length) return []
  let map = {
    hot: {
      title: HOT_NAME,
      items: []
    }
  }

  list.forEach((item, index) => {
    if (index < HOT_SINGER_LENGTH) {
      map.hot.items.push(new CreateSinger({
        id: item.singer_mid,
        name: item.singer_name,
        avatar: item.singer_pic
      }))
    }

    const key = pinyin(item.singer_name, {
      style: pinyin.STYLE_FIRST_LETTER
    })[0][0].substr(0, 1).toLocaleUpperCase()
    if (!map[key]) {
      map[key] = {
        title: key,
        items: []
      }
    }

    map[key].items.push(new CreateSinger({
      id: item.singer_mid,
      name: item.singer_name,
      avatar: item.singer_pic
    }))
  })

  let hot = []
  let ret = []
  let shortCut = []
  for (let key in map) {
    let val = map[key]
    if (val.title.match(/[A-Z]/)) {
      ret.push(val)
      shortCut.push(val.title)
    } else if (val.title === HOT_NAME) {
      hot.push(val)
    }
  }
  ret.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
  shortCut.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
  shortCut.unshift(HOT_NAME)
  dispatch(shortCutList(shortCut))
  return hot.concat(ret)
}
