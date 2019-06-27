import types from './types'
import {playMode,storageKey} from "../../../config"

const storage = window.localStorage

const playHistory = JSON.parse(storage[storageKey.PLAY_HISTORY_KEY] || "[]")

const favoriteList = JSON.parse(storage[storageKey.FAVORITE_LIST_KEY] || "[]")

const MODE_KEY = '__MODE__'
const mode = storage[MODE_KEY] || playMode[0].code

const defaultState = {
  singer: {}, // 歌手信息
  playing: false, // 播放状态
  fullScreen: false, // 播放器展开状态
  playList: [], // 播放列表
  sequenceList: [], // 歌曲列表
  mode, // 播放模式
  currentIndex: -1, // 当前播放歌曲索引,
  vKey: [], // 歌曲播放权限 vKey,
  playHistory, //播放历史
  favoriteList // 喜欢的歌曲列表
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_PLAY_STATE:
      return Object.assign({}, state, {
        playing: action.playing
      })
    case types.SET_SELECT_PLAY:
      return Object.assign({}, state, {
        fullScreen: true,
        playList: action.playList,
        sequenceList: action.sequenceList,
        currentIndex: action.index
      })
    case types.SET_CURRENT_INDEX:
      return Object.assign({}, state, {
        currentIndex: action.index
      })
    case types.SET_PLAY_LIST:
      return Object.assign({}, state, {
        playList: action.playList
      })
    case types.SET_PLAY_MODE:
      storage[MODE_KEY] = action.mode
      return Object.assign({}, state, {
        mode: action.mode
      })
    case types.SET_FULL_SCREEN:
      return Object.assign({}, state, {
        fullScreen: action.fullScreen
      })
    case types.SET_SEQUENCE_LIST:
      return Object.assign({}, state, {
        sequenceList: action.sequenceList
      })
    case types.SET_V_KEY:
      return Object.assign({}, state, {
        vKey: action.vKey
      })
    case types.SET_PLAY_HISTORY:
      storage[storageKey.PLAY_HISTORY_KEY] = JSON.stringify(action.playHistory)
      return Object.assign({}, state, {
        playHistory: action.playHistory
      })
    case types.SET_FAVORITE_LIST:
      storage[storageKey.FAVORITE_LIST_KEY] = JSON.stringify(action.favoriteList)
      return Object.assign({}, state, {
        favoriteList: action.favoriteList
      })
    default:
      return state
  }
}
