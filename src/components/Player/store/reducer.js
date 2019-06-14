import types from './types'
import {playMode} from "../../../config"

const defaultState = {
  singer: {}, // 歌手信息
  playing: false, // 播放状态
  fullScreen: false, // 播放器展开状态
  playList: [], // 播放列表
  sequenceList: [], // 歌曲列表
  mode: playMode[0].code, // 播放模式
  currentIndex: -1 // 当前播放歌曲索引
}

export default (state = defaultState, actions) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch (actions.type) {
    case types.SET_PLAY_STATE:
      newState.playing = actions.playing
      return newState
    case types.SET_SELECT_PLAY:
      newState.playing = true
      newState.fullScreen = true
      newState.playList = actions.playList
      newState.sequenceList = actions.sequenceList
      newState.currentIndex = actions.index
      return newState
    case types.SET_CURRENT_INDEX:
      newState.currentIndex = actions.index
      return newState
    case types.SET_PLAY_LIST:
      console.log(actions.playList)
      newState.playList = actions.playList
      return newState
    case types.SET_PLAY_MODE:
      newState.mode = actions.mode
      return newState
    case types.SET_FULL_SCREEN:
      newState.fullScreen = actions.fullScreen
      return newState
    case types.SET_SEQUENCE_LIST:
      console.log(actions.sequenceList)
      newState.sequenceList = actions.sequenceList
      return newState
    default:
      return state
  }
}
