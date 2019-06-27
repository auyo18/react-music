import React, {PureComponent} from 'react'
import Scroll from '../../containers/Scroll'
import SongList from '../../containers/SongList'
import Loading from '../../containers/Loading'
import {connect} from "react-redux"
import {shuffle} from "../../utils"
import {setPlayList, setSequenceList, setCurrentIndex, setFullScreen, setPlayMode} from "../Player/store/actions"
import {playMode} from "../../config"
import './index.scss'

const HEADER_HEIGHT = 300

class MusicList extends PureComponent {
  componentWillMount() {
    this.probeType = 3
    this.listenScroll = true
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.refs.listWrapper.style.bottom = nextProps.playList.length > 0 ? '50px' : ''
  }

  back = () => {
    this.props.back()
  }

  scroll = pos => {
    const y = pos.y
    const scale = Math.abs(y / HEADER_HEIGHT)
    if (y + HEADER_HEIGHT <= 45) {
      this.refs.header.style.height = '45px'
      this.refs.header.style.zIndex = 101
      this.refs.header.style.overflow = 'hidden'
    } else {
      this.refs.header.style.height = null
      this.refs.header.style.zIndex = null
      this.refs.header.style.overflow = null
    }

    if (y > 0) {
      this.refs.bgImage.style.transform = `scale(${1 + scale})`
      this.refs.playBtnWrapper.style.transform = `scale(${1 / (1 + scale)})`
    } else if (y > -HEADER_HEIGHT) {
      this.refs.bgImage.style.transform = 'scale(1)'
      this.refs.playBtnWrapper.style.transform = 'scale(1)'
      this.refs.mask.style.opacity = `${Math.min(scale * .8 + 0.2, .9)}`
    }
  }
  randomPlay = () => {

  }

  render() {
    const {singer, songList, randomPlay} = this.props
    singer && (singer.avatar = singer.avatar && singer.avatar.replace('150x150', '500x500').replace('300x300', '500x500'))
    return (
      <div className="music-list">
        <div className="header" ref="header">
          <div className="back" onClick={this.back}>
            <i className="iconfont iconfanhui5"/>
          </div>
          <h1 className="title">
            {singer && singer.name}
          </h1>
          <div className="bg-image" ref="bgImage"
               style={singer && singer.avatar ? {backgroundImage: `url(${singer.avatar})`} : {}}>
            <div className="mask" ref="mask"/>
            <div className="play-btn-wrapper" ref="playBtnWrapper">
              <div className="play" onClick={() => {
                randomPlay(songList)
              }}>
                <i className="iconfont iconbofang1"/>
                <span>随机播放全部</span>
              </div>
            </div>
          </div>
        </div>
        <div className="list-wrapper scroll-view" ref="listWrapper">
          {
            songList && songList.length ?
              <Scroll
                probeType={this.probeType}
                listenScroll={this.listenScroll}
                data={songList}
                scroll={pos => {
                  this.scroll(pos)
                }}
                className="scroll-content"
              >
                <SongList songList={songList}/>
              </Scroll> : <Loading/>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  playList: state.player.playList
})

const mapDispatchToProps = dispatch => ({
  randomPlay(songList) {
    let list = shuffle(songList)
    const mode = playMode.findIndex(item => item.name === 'random')
    dispatch(setPlayMode(mode))
    dispatch(setSequenceList(songList))
    dispatch(setPlayList(list))
    dispatch(setCurrentIndex(0))
    dispatch(setFullScreen(true))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MusicList)
