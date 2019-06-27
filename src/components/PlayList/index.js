import React, {PureComponent} from 'react'
import {connect} from "react-redux"
import {playMode} from "../../config"
import Scroll from '../../containers/Scroll'
import AddSong from '../AddSong'
import './index.scss'
import {setPlayList, setSequenceList, setCurrentIndex, setPlayingState} from "../Player/store/actions"

class PlayList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showAddSong: false
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.currentSong.id !== prevProps.currentSong.id || this.props.show !== prevProps.show) {
      this.scrollToCurrent()
    }
  }

  scrollToCurrent = () => {
    const index = this.props.sequenceList.findIndex(song => song.id === this.props.currentSong.id)
    this.refs.scroll.scrollToElement([this.refs.itemBox.children[index - 2], 1000])
  }

  hidePlayList = () => {
    this.props.hidePlayList()
  }

  showAddSong = () => {
    this.setState(() => ({
      showAddSong: true
    }))
  }

  hideAddSong = () => {
    this.setState(() => ({
      showAddSong: false
    }))
  }

  isFavorite = id => {
    return this.props.favoriteList.findIndex(item => item.id === id) > -1
  }

  render() {
    const {show, mode, sequenceList, playList, currentSong, currentIndex, deleteSong, selectSong, changeMode, toggleFavorite} = this.props
    return (
      <div className={`playlist ${show ? 'show' : 'hide'}`} onClick={() => {
        this.hidePlayList()
      }}>
        <div className="list-wrapper fixed-container" onClick={e => {
          e.stopPropagation()
        }}>
          <div className="list-header">
            <i className={`iconfont ${playMode[mode].icon}`} onClick={() => {
              changeMode(mode, playList, sequenceList, currentSong.id)
            }}/>
            <p className="name" onClick={() => {
              changeMode(mode, playList, sequenceList, currentSong.id)
            }}>
              {playMode[mode].title}
              <span style={playMode[mode].name === 'loop' ? {display: 'none'} : {}}>({playList.length}首)</span>
            </p>
            <i className="iconfont iconshanchu1" style={{display: 'none'}}/>
          </div>
          <div className="playlist-content-wrapper">
            <Scroll ref="scroll" className="playlist-content-container" data={sequenceList}>
              <div ref="itemBox">
                {
                  sequenceList.map((song, index) => (
                    <div
                      onClick={() => {
                        selectSong(song, index, mode, playList)
                      }}
                      className={`item ${song.id === currentSong.id ? 'cur' : ''}`} key={'playList' + song.id}
                    >
                      <p className="text">
                        <span>{song.name}</span> - {song.singer}
                      </p>
                      <i className={`play iconfont ${song.id === currentSong.id ? 'iconyouyinpin' : ''}`}/>
                      <i
                        onClick={e => {
                          e.stopPropagation()
                          toggleFavorite(song)
                        }}
                        className={`iconfont ${this.isFavorite(song.id) ? 'like iconxihuan' : 'iconxihuan1'}`}/>
                      <i className="iconfont iconshanchu2" onClick={e => {
                        e.stopPropagation()
                        deleteSong(song.id, currentIndex, playList, sequenceList)
                      }}/>
                    </div>
                  ))
                }
              </div>
            </Scroll>
          </div>
          <p className="add-song-btn" onClick={e => {
            e.stopPropagation()
            this.showAddSong()
          }}>
            <span>添加歌曲到队列</span>
          </p>
          <p className="hide-btn" onClick={e => {
            e.stopPropagation()
            this.hidePlayList()
          }}>关闭</p>
        </div>
        <AddSong hideAddSong={this.hideAddSong} showAddSong={this.state.showAddSong}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  mode: state.player.mode,
  sequenceList: state.player.sequenceList,
  playList: state.player.playList,
  currentIndex: state.player.currentIndex,
  currentSong: state.player.playList[state.player.currentIndex] || {},
  favoriteList: state.player.favoriteList
})
const mapDispatchToProps = dispatch => ({
  deleteSong(id, currentIndex, playList, sequenceList) {
    const _playList = playList.slice()
    const _sequenceList = sequenceList.slice()
    const pIndex = _playList.findIndex(song => song.id === id)
    const sIndex = _sequenceList.findIndex(song => song.id === id)
    _playList.splice(pIndex, 1)
    _sequenceList.splice(sIndex, 1)
    if (currentIndex > pIndex || currentIndex === _playList.length) {
      currentIndex--
    }
    dispatch(setCurrentIndex(currentIndex))
    dispatch(setPlayList(_playList))
    dispatch(setSequenceList(_sequenceList))
    !_playList.length && dispatch(setPlayingState(false))
  },
  selectSong(song, index, mode, playList) {
    if (playMode[mode].name === 'random') {
      index = playList.findIndex(item => item.id === song.id)
    }
    dispatch(setCurrentIndex(index))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayList)
