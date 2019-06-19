import React, {PureComponent} from 'react'
import Switches from '../../containers/Switches'
import Scroll from "../../containers/Scroll"
import SongList from "../../containers/SongList"
import {connect} from "react-redux"
import './index.scss'
import {CSSTransition} from "react-transition-group"
import {shuffle} from "../../utils"
import {playMode} from "../../config"
import {setCurrentIndex, setFullScreen, setPlayList, setPlayMode, setSequenceList} from "../Player/store/actions"

const time = 300

class User extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      switches: ['我喜欢的', '最近听的'],
      switchIndex: 0
    }
  }

  componentDidMount() {
    this.setBottom(this.props.playList)
    this.setState(() => ({
      show: true
    }))
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setBottom(nextProps.playList)
  }

  setBottom = playList => {
    this.refs.scrollView.style.bottom = playList.length > 0 ? '50px' : ''
  }

  changeSwitchIndex = index => {
    this.setState(() => ({
      switchIndex: index
    }))
  }

  back = () => {
    this.setState(() => ({
      show: false
    }), () => {
      setTimeout(() => {
        if (this.props.location.state && this.props.location.state.entry) {
          this.props.history.goBack()
        } else {
          this.props.history.push('/')
        }
      }, time)
    })

  }

  render() {
    return (
      <CSSTransition
        in={this.state.show}
        timeout={time}
        className="slide fixed-container user-wrapper"
      >
        <div>
          <div className="header">
            <div className="back" onClick={this.back}>
              <i className="iconfont iconfanhui5" />
            </div>
            <h3 className="title">个人中心</h3>
          </div>
          <div className="switches-wrapper">
            <Switches
              switches={this.state.switches}
              currentIndex={this.state.switchIndex}
              changeSwitchIndex={this.changeSwitchIndex} />
          </div>
          <div className="play-btn" onClick={() => {
            this.props.randomPlay(this.state.switchIndex === 0 ? this.props.favoriteList : this.props.playHistory)
          }}>
            <i className="iconfont iconsuijibofang" />
            <span>随机播放全部</span>
          </div>
          <div className="scroll-view fixed-container" ref="scrollView">
            <Scroll className="scroll-content" data={this.props.favoriteList}
                    style={this.state.switchIndex === 0 ? {} : {visibility: 'hidden'}}>
              {
                this.props.favoriteList.length < 1 && <p className="tip">暂无喜欢的歌曲</p>
              }
              <SongList songList={this.props.favoriteList} />
            </Scroll>
            <Scroll className="scroll-content" data={this.props.playHistory}
                    style={this.state.switchIndex === 1 ? {} : {visibility: 'hidden'}}>
              {
                this.props.playHistory.length < 1 && <p className="tip">暂无最近播放的歌曲</p>
              }
              <SongList songList={this.props.playHistory} />
            </Scroll>
          </div>
        </div>
      </CSSTransition>
    )
  }
}

const mapStateToProps = state => ({
  playList: state.player.playList,
  favoriteList: state.player.favoriteList,
  playHistory: state.player.playHistory
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

export default connect(mapStateToProps, mapDispatchToProps)(User)
