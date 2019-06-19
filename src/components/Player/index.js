import React, {PureComponent, Fragment} from 'react'
import './index.scss'
import {connect} from "react-redux"
import {
  setPlayingState,
  setCurrentIndex,
  setPlayList,
  setPlayMode,
  setFullScreen,
  setPlayHistory,
  setFavoriteList
} from "./store/actions"
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {playMode} from "../../config"
import {shuffle, addZero} from "../../utils"
import Toast from '../../containers/Toast'
import PlayList from '../PlayList'
import {getLyric} from "../../api/song"
import {Base64} from 'js-base64'
import Lyric from 'lyric-parser'
import Scroll from '../../containers/Scroll'
import ProgressBar from '../../containers/ProgressBar'
import defaultImage from '../../assets/images/default.png'

const PLAY_HISTORY_MAX_LENGTH = 200

class Player extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: 0,
      percent: 0,
      playListShow: false,
      lyric: null,
      lyricLineNum: 0,
      lyricTxt: '',
      currentShow: 'cd'
    }
    this.touch = {}
    this.progress = {}
    this.progressBarMove = false
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {currentSong} = this.props
    if (prevProps.playing !== this.props.playing) {
      this.watchPlaying(currentSong, this.props.playing)
    }
    if (!this.props.playList.length) {
      this.setState(() => ({
        playListShow: false
      }))
    }
    this.watchCurrentSong(prevProps.currentSong, currentSong)
  }

  watchPlaying = (currentSong, playing) => {
    const {audio} = this.refs
    playing ? audio.play() : audio.pause()
    this.state.lyric && this.state.lyric.togglePlay()
  }

  watchCurrentSong = (oldSong, newSong) => {
    if (oldSong.id === newSong.id || !newSong.url) return
    this.state.lyric && this.state.lyric.stop()
    this.refs.audio.play()
    this.play()
    this.props.setPlayHistory(newSong, this.props.playHistory)
    this.getLyric(newSong.id)
  }

  play = () => {
    this.props.setPlayingState(true)
  }

  pause = () => {
    this.props.setPlayingState(false)
  }

  end = () => {
    console.log('结束')
    if (playMode[this.props.mode].name === 'loop') {
      this.loopPlay()
    } else {
      this.nextSong()
    }
  }

  loopPlay = () => {
    this.refs.audio.currentTime = 0
    this.refs.audio.play()
    if (this.state.lyric) {
      this.state.lyric.seek(0)
    }
  }

  prevSong = () => {
    if (this.props.playList.length === 1) {
      this.loopPlay()
    } else {
      this.props.prevSong(this.props.currentIndex, this.props.playList.length, this.props.playing)
    }
  }

  nextSong = () => {
    if (this.props.playList.length === 1) {
      this.loopPlay()
    } else {
      this.props.nextSong(this.props.currentIndex, this.props.playList.length, this.props.playing)
    }
  }

  timeUpdate = e => {
    if (this.progressBarMove) return
    e.persist()
    const currentTime = e.target.currentTime
    const percent = currentTime / this.props.currentSong.interval
    this.setState(() => ({
      currentTime,
      percent
    }))
  }

  updateSongTime = time => {
    this.refs.audio.currentTime = time
    if (this.state.lyric) {
      this.state.lyric.seek(time * 1000)
    }
  }

  format = (interval) => {
    interval = interval | 0
    const minute = interval / 60 | 0
    const second = addZero(interval % 60)
    return `${minute}:${second}`
  }

  showPlayList = () => {
    this.setState({playListShow: true})
  }

  hidePlayList = () => {
    this.setState({playListShow: false})
  }

  error = () => {
    this.pause()
  }

  getLyric = async id => {
    let data = await getLyric(id)
    this.setState(() => ({
      lyric: new Lyric(Base64.decode(data.lyric), this.handleLyric)
    }))
    if (this.props.playing) {
      this.state.lyric.play()
    }
  }

  handleLyric = ({lineNum, txt}) => {
    this.setState(() => ({
      lyricLineNum: lineNum,
      lyricTxt: txt
    }))
    if (lineNum > 5) {
      let lineEl = this.refs.lyricWrapper.children[lineNum - 5]
      this.refs.lyric.scrollToElement([lineEl, 1e3])
    } else {
      this.refs.lyric.scrollTo([0, 0, 1e3])
    }
  }

  middleTouchStart = e => {
    this.touch.initiated = true
    this.touch.percent = 0
    const touch = e.touches[0]
    this.touch.startX = touch.pageX
    this.touch.startY = touch.pageY
  }
  middleTouchMove = e => {
    if (!this.touch.initiated) return
    const touch = e.touches[0]
    const deltaX = touch.pageX - this.touch.startX
    const deltaY = touch.pageY - this.touch.startY
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      this.touch.percent = null
      this.touch.initiated = false
      return
    }

    const width = this.refs.middle.clientWidth
    const left = this.state.currentShow === 'cd' ? 0 : -width
    const offsetWidth = Math.min(0, Math.max(-width, left + deltaX))
    this.touch.percent = Math.abs(offsetWidth / width)
    this.refs.lyric.refs.wrapper.style.transform = `translateX(${offsetWidth}px)`
    this.refs.cd.style.opacity = 1 - this.touch.percent
  }
  middleTouchEnd = () => {
    if (!this.touch.initiated || !this.touch.percent) return
    this.touch.initiated = false
    let offsetWidth
    let opacity
    if (this.state.currentShow === 'cd') {
      if (this.touch.percent > .1) {
        offsetWidth = -this.refs.middle.clientWidth
        this.setState(() => ({
          currentShow: 'lyric'
        }))
        opacity = 0
      } else {
        offsetWidth = 0
        opacity = 1
      }
    } else {
      if (this.touch.percent < .9) {
        offsetWidth = 0
        this.setState(() => ({
          currentShow: 'cd'
        }))
        opacity = 1
      } else {
        offsetWidth = -this.refs.middle.clientWidth
        opacity = 0
      }
    }
    this.refs.lyric.refs.wrapper.style.transform = `translateX(${offsetWidth}px)`
    this.refs.cd.style.opacity = opacity
  }

  changeProgressBarMoveState = state => {
    this.progressBarMove = state
  }

  isFavorite = song => {
    return this.props.favoriteList.findIndex(item => item.id === song.id)
  }

  toggleFavorite = song => {
    let favoriteList = this.props.favoriteList.slice()
    const index = this.isFavorite(song)
    if (index > -1) {
      favoriteList.splice(index, 1)
    } else {
      favoriteList.unshift(song)
    }

    this.props.setFavoriteList(favoriteList)
  }

  render() {
    const {playList, sequenceList, currentSong, playing, mode, fullScreen, setPlayingState, changeMode, setFullScreen} = this.props
    return (
      <Fragment>
        {
          <div className="player" style={playList.length ? {} : {visibility: 'hidden'}}>
            <div className={`normal-player fixed-container ${fullScreen ? 'show' : 'hide'}`}>
              <div className="background"
                   style={currentSong.image ? {backgroundImage: `url(${currentSong.image})`} : {}}>
              </div>
              <div className="top">
                <div className="back" onClick={() => {
                  setFullScreen(false)
                }}>
                  <i className="iconfont iconxiajiantou"/>
                </div>
                <h2 className="title">
                  {currentSong.name}
                </h2>
                <h3 className="subtitle">
                  {currentSong.singer}
                </h3>
              </div>
              <div
                className="middle scroll-view"
                ref="middle"
                onTouchStart={this.middleTouchStart}
                onTouchMove={this.middleTouchMove}
                onTouchEnd={this.middleTouchEnd}>
                <div className="middle-l" ref="cd">
                  <TransitionGroup>
                    <CSSTransition
                      key={currentSong.id}
                      timeout={500}
                      classNames="slide-top"
                    >
                      <div className="cd-wrapper">
                        <div className={`cd ${playing ? 'play' : 'pause'}`}>
                          <img src={currentSong.image || defaultImage} alt=""/>
                        </div>
                      </div>
                    </CSSTransition>
                  </TransitionGroup>
                  <div className="playing-lyric-wrapper">
                    <p className="play-lyric">
                      {this.state.lyricTxt}
                    </p>
                  </div>
                </div>
                <Scroll ref="lyric" className="middle-r" data={this.state.lyric && this.state.lyric.lines}>
                  <div className="lyric-wrapper" ref="lyricWrapper">
                    {
                      this.state.lyric && this.state.lyric.lines && this.state.lyric.lines.map((line, index) => (
                        <p className={`text ${this.state.lyricLineNum === index ? 'cur' : ''}`}
                           key={line.time}>{line.txt}</p>
                      ))
                    }
                  </div>
                </Scroll>
              </div>
              <div className="bottom">
                <div className="dot-wrapper">
                  <i className={`dot ${this.state.currentShow === 'cd' ? 'active' : ''}`}/>
                  <i className={`dot ${this.state.currentShow !== 'cd' ? 'active' : ''}`}/>
                </div>
                <div className="progress-wrapper">
                  <span className="time time-l">
                    {this.format(this.state.currentTime)}
                  </span>
                  <div className="progress-bar-wrapper">
                    <ProgressBar
                      percent={this.state.percent}
                      interval={this.props.currentSong.interval}
                      updateSongTime={this.updateSongTime}
                      setPlayingState={this.props.setPlayingState}
                      changeProgressBarMoveState={this.changeProgressBarMoveState}
                    />
                  </div>
                  <span className="time time-r">
                    {this.format(currentSong.interval)}
                  </span>
                </div>
                <div className="operators">
                  <div className="icon left">
                    <i className={`iconfont mode ${playMode[mode].icon}`} onClick={() => {
                      changeMode(mode, playList, sequenceList, currentSong.id)
                    }}/>
                  </div>
                  <div className="icon left">
                    <i className="iconfont prev iconhoutui" onClick={this.prevSong}/>
                  </div>
                  <div className="icon center">
                    <i
                      className={`iconfont play ${playing ? 'iconplus-pause' : 'iconbofang1'}`}
                      onClick={e => {
                        e.stopPropagation()
                        setPlayingState(!playing)
                      }}
                    />
                  </div>
                  <div className="icon right">
                    <i className="iconfont mode iconqianjin" onClick={this.nextSong}/>
                  </div>
                  <div className="icon right">
                    <i className={`iconfont ${this.isFavorite(currentSong) > -1 ? 'like iconxihuan' : 'iconxihuan1'}`}
                       onClick={e => {
                         e.stopPropagation()
                         this.toggleFavorite(currentSong)
                       }}/>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`mini-player fixed-container ${fullScreen ? 'hide' : 'show'}`}
              onClick={() => {
                setFullScreen(true)
              }}
            >
              <div className={`cd ${playing ? 'play' : 'pause'}`}>
                <img src={currentSong.image || defaultImage} alt=""/>
              </div>
              <div className="text">
                <h2 className="name">{currentSong.name} - {currentSong.singer}</h2>
              </div>
              <div className="control" onClick={e => {
                e.stopPropagation()
                setPlayingState(!playing)
              }}>
                <div className="progress-circle">
                  <svg viewBox="0 0 100 100">
                    <circle
                      strokeDasharray={Math.PI * 100}
                      strokeDashoffset={(1 - (this.state.percent || 0)) * Math.PI * 100}
                      r="50"
                      cx="50"
                      cy="50"
                      strokeWidth="2"
                      fill="transparent"
                      className="progress-bar"
                    />
                  </svg>
                  <i
                    className={`iconfont play ${playing ? 'iconplus-pause' : 'iconbofang1'}`}
                  />
                </div>
              </div>
              <div className="control" onClick={e => {
                e.stopPropagation()
                this.showPlayList()
              }}>
                <i className="iconfont list iconliebiao"/>
              </div>
            </div>
            <PlayList
              show={this.state.playListShow}
              hidePlayList={this.hidePlayList}
              changeMode={this.props.changeMode}
              toggleFavorite={this.toggleFavorite}/>
            <audio
              ref="audio"
              src={currentSong.url}
              onTimeUpdate={this.timeUpdate}
              onError={this.error}
              onEnded={this.end}/>
            <Toast title={playMode[mode].title}/>
          </div>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  singer: state.player.singer,
  playing: state.player.playing,
  fullScreen: state.player.fullScreen,
  playList: state.player.playList,
  sequenceList: state.player.sequenceList,
  mode: state.player.mode,
  currentIndex: state.player.currentIndex,
  currentSong: state.player.playList[state.player.currentIndex] || {},
  playHistory: state.player.playHistory,
  favoriteList: state.player.favoriteList
})

const mapDispatchToProps = dispatch => ({
  setPlayingState(playing) {
    dispatch(setPlayingState(playing))
  },
  prevSong(currentIndex, length, playing) {
    let index = currentIndex === 0 ? length - 1 : currentIndex - 1
    dispatch(setCurrentIndex(index))
    !playing && dispatch(setPlayingState(true))
  },
  nextSong(currentIndex, length, playing) {
    let index = currentIndex === length - 1 ? 0 : currentIndex + 1
    dispatch(setCurrentIndex(index))
    !playing && dispatch(setPlayingState(true))
  },
  changeMode(mode, playList, sequenceList, id) {
    const _mode = (mode + 1) % playMode.length
    dispatch(setPlayMode(_mode))
    let list = []
    if (playMode[_mode].code === playMode[2].code) {
      list = shuffle(playList)
    } else {
      list = sequenceList
    }
    const index = list.findIndex(item => (item.id === id))
    dispatch(setCurrentIndex(index))
    dispatch(setPlayList(list))
  },
  setFullScreen(fullScreen) {
    dispatch(setFullScreen(fullScreen))
  },
  setPlayHistory(song, history) {
    const playHistory = history.slice()
    const index = playHistory.findIndex(item => item.id === song.id)
    if (index === 0) return
    if (index > 0) {
      playHistory.splice(index, 1)
    }
    playHistory.unshift(song)
    if (playHistory.length > PLAY_HISTORY_MAX_LENGTH) {
      playHistory.pop()
    }
    dispatch(setPlayHistory(playHistory))
  },
  setFavoriteList(favoriteList) {
    dispatch(setFavoriteList(favoriteList))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Player)
