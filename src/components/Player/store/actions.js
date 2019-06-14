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

export const setPlayList = playList => ({
  type: types.SET_PLAY_LIST,
  playList
})

export const setSequenceList = sequenceList => ({
  type: types.SET_SEQUENCE_LIST,
  sequenceList
})

export const setFullScreen = fullScreen => ({
  type: types.SET_FULL_SCREEN,
  fullScreen
})
