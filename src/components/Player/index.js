import React, {PureComponent, Fragment} from 'react'
import './index.scss'
import {connect} from "react-redux"
import {setPlayingState, setCurrentIndex, setPlayList, setPlayMode, setFullScreen} from "./store/actions"
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {playMode} from "../../config"
import {shuffle, addZero} from "../../utils"
import Toast from '../../containers/Toast'
import PlayList from '../PlayList'
import defaultImage from '../../assets/images/default.png'

class Player extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: 0,
      playListShow: false
    }
    this.touch = {}
    this.progress = {}
  }

  componentDidMount() {
    this.progress.BtnWidth = this.refs.progressBtn.clientWidth
    this.progress.BarWidth = this.refs.progressBar.clientWidth - this.progress.BtnWidth
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {currentSong} = this.props
    this.watchPlaying(currentSong, this.props.playing)
    this.watchCurrentSong(prevProps.currentSong, currentSong)
  }

  watchPlaying = (currentSong, playing) => {
    const {audio} = this.refs
    if (currentSong.url) {
      playing ? audio.play() : audio.pause()
    }
  }

  watchCurrentSong = (oldSong, newSong) => {
    if (oldSong.mid !== newSong.mid) {
      if (newSong.url) {
        this.refs.audio.play()
      }
    }
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
  }

  prevSong = () => {
    this.props.prevSong(this.props.currentIndex, this.props.playList.length, this.props.playing)
  }

  nextSong = () => {
    this.props.nextSong(this.props.currentIndex, this.props.playList.length, this.props.playing)
  }

  timeUpdate = e => {
    if (this.touch.initiated) return
    e.persist()
    this.setState(() => ({
      currentTime: e.target.currentTime
    }), () => {
      this.percent()
    })
  }

  updateSongTime = time => {
    this.refs.audio.currentTime = time
  }

  format = (interval) => {
    interval = interval | 0
    const minute = interval / 60 | 0
    const second = addZero(interval % 60)
    return `${minute}:${second}`
  }

  percent = () => {
    this.progress.percent = this.state.currentTime / this.props.currentSong.interval
    const progressWidth = this.progress.BarWidth * this.progress.percent
    this.setProgress(progressWidth)
  }

  setProgress = progressWidth => {
    this.refs.progress.style.width = progressWidth + 'px'
    this.refs.progressBtnWP.style.left = progressWidth + 'px'
  }

  progressTouchStart = e => {
    this.touch.initiated = true
    this.touch.startX = e.touches[0].pageX
    this.touch.progressWidth = this.refs.progress.clientWidth
  }

  progressTouchMove = e => {
    if (!this.touch.initiated) return
    const delta = e.touches[0].pageX - this.touch.startX
    const newWidth = Math.min(this.progress.BarWidth, Math.max(0, this.touch.progressWidth + delta))
    this.setProgress(newWidth)
  }

  progressTouchEnd = () => {
    this.touch.initiated = false
    const time = this.refs.progress.clientWidth / this.progress.BarWidth * this.props.currentSong.interval
    this.updateSongTime(time)
    if (!this.props.playing) {
      this.props.setPlayingState(true)
    }
  }

  showPlayList = () => {
    this.setState({playListShow: true})
  }

  hidePlayList = () => {
    this.setState({playListShow: false})
  }

  error = () => {
    console.log(123)
    this.pause()
  }

  render() {
    const {playList, sequenceList, currentSong, playing, mode, fullScreen, setPlayingState, changeMode, setFullScreen} = this.props
    return (
      <Fragment>
        {
          <div className="player" style={playList.length ? {} : {visibility: 'hidden'}}>
            <div className={`normal-player ${fullScreen ? 'show' : 'hide'}`}>
              <div className="background">
                <img src={currentSong.image} alt=""/>
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
              <div className="middle">
                <div className="middle-l">
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
                    <div className="play-lyric"/>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="dot-wrapper">

                </div>
                <div className="progress-wrapper">
                  <span className="time time-l">
                    {this.format(this.state.currentTime)}
                  </span>
                  <div className="progress-bar-wrapper">
                    <div className="progress-bar" ref="progressBar">
                      <div className="bar-inner">
                        <div className="progress" ref="progress"/>
                        <div
                          className="progress-btn-wrapper"
                          ref="progressBtnWP"
                          onTouchStart={this.progressTouchStart}
                          onTouchMove={this.progressTouchMove}
                          onTouchEnd={this.progressTouchEnd}
                        >
                          <div className="progress-btn" ref="progressBtn"/>
                        </div>
                      </div>
                    </div>
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
                    <i className="iconfont mode iconxihuan1"/>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`mini-player ${fullScreen ? 'hide' : 'show'}`}
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
                      strokeDashoffset={(1 - (this.progress.percent || 0)) * Math.PI * 100}
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
              changeMode={this.props.changeMode}/>
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
  currentSong: state.player.playList[state.player.currentIndex] || {}
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Player)
