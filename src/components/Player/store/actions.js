import types from './types'

export const selectPlay = (playList, sequenceList, index) => ({
  type: types.SET_SELECT_PLAY,
  playList,
  sequenceList,
  index
})

export const setPlayingState = playing => ({
  type: types.SET_PLAY_STATE,
  playing
})

export const setCurrentIndex = index => ({
  type: types.SET_CURRENT_INDEX,
  index
})

export const setPlayMode = mode => ({
  type: types.SET_PLAY_MODE,
  mode
})

export const setPlayList = list => ({
  type: types.SET_PLAYLIST,
  list
})

export const setFullScreen = fullScreen => ({
  type: types.SET_FULL_SCREEN,
  fullScreen
})
