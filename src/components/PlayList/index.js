import React, {PureComponent} from 'react'
import {connect} from "react-redux"
import {playMode} from "../../config"
import Scroll from '../../containers/Scroll'
import './index.scss'
import {setPlayList, setSequenceList} from "../Player/store/actions"

class PlayList extends PureComponent {
  hidePlayList = () => {
    this.props.hidePlayList()
  }

  render() {
    const {show, mode, sequenceList, playList, currentSong, deleteSong} = this.props
    return (
      <div className={`playlist ${show ? 'show' : 'hide'}`} onClick={() => {
        this.hidePlayList()
      }}>
        <div className="list-wrapper" onClick={e => {
          e.stopPropagation()
        }}>
          <div className="list-header">
            <i className={`iconfont ${playMode[mode].icon}`} onClick={() => {
              this.props.changeMode(mode, playList, sequenceList, currentSong.id)
            }}/>
            <p className="name" onClick={() => {
              this.props.changeMode(mode, playList, sequenceList, currentSong.id)
            }}>
              {playMode[mode].title}
              <span style={playMode[mode].name === 'loop' ? {display: 'none'} : {}}>({playList.length}首)</span>
            </p>
            <i className="iconfont iconshanchu1"/>
          </div>
          <div className="playlist-content-wrapper">
            <Scroll className="playlist-content-container">
              <div>
                {
                  sequenceList.map(song => (
                    <div className={`item ${song.id === currentSong.id ? 'cur' : ''}`} key={song.id}>
                      <p className="text">
                        <span>{song.name}</span> - {song.singer}
                      </p>
                      <i className={`play iconfont ${song.id === currentSong.id ? 'iconyouyinpin' : ''}`}/>
                      <i className="iconfont iconxihuan1"/>
                      <i className="iconfont iconshanchu2" onClick={() => {
                        deleteSong(song.id, playList, sequenceList)
                      }}/>
                    </div>
                  ))
                }
              </div>
            </Scroll>
          </div>
          <p className="add-song-btn">
            <span>添加歌曲到队列</span>
          </p>
          <p className="hide-btn" onClick={e => {
            e.stopPropagation()
            this.hidePlayList()
          }}>关闭</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  mode: state.player.mode,
  sequenceList: state.player.sequenceList,
  playList: state.player.playList,
  currentIndex: state.player.currentIndex,
  currentSong: state.player.playList[state.player.currentIndex] || {}
})
const mapDispatchToProps = dispatch => ({
  deleteSong(id, playList, sequenceList) {
    const _playList = playList.slice()
    const _sequenceList = sequenceList.slice()
    const pIndex = _playList.findIndex(song => song.id === id)
    const sIndex = _sequenceList.findIndex(song => song.id === id)
    _playList.splice(pIndex, 1)
    _sequenceList.splice(sIndex, 1)
    dispatch(setPlayList(_playList))
    dispatch(setSequenceList(_sequenceList))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayList)
