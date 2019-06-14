import React, {PureComponent} from 'react'
import Scroll from '../../containers/Scroll'
import SongList from '../../containers/SongList'
import Loading from '../../containers/Loading'
import './index.scss'

const HEADER_HEIGHT = 300

class MusicList extends PureComponent {
  componentWillMount() {
    this.probeType = 3
    this.listenScroll = true
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

  render() {
    const {singer, songList} = this.props
    singer.avatar = singer.avatar && singer.avatar.replace('150x150', '500x500')
    return (
      <div className="music-list">
        <div className="header" ref="header">
          <div className="back" onClick={this.back}>
            <i className="iconfont iconfanhui5" />
          </div>
          <h1 className="title">
            {singer.name}
          </h1>
          <div className="bg-image" ref="bgImage" style={singer.avatar && {backgroundImage: `url(${singer.avatar})`}}>
            <div className="mask" ref="mask" />
            <div className="play-btn-wrapper" ref="playBtnWrapper">
              <div className="play">
                <i className="iconfont iconbofang1" />
                <span>随机播放全部</span>
              </div>
            </div>
          </div>
        </div>
        <div className="list-wrapper scroll-view">
          {
            songList.length ?
              <Scroll
                probeType={this.probeType}
                listenScroll={this.listenScroll}
                data={songList}
                scroll={pos => {
                  this.scroll(pos)
                }}
                className="scroll-content"
              >
                <SongList songList={songList} />
              </Scroll> : <Loading />
          }
        </div>
      </div>
    )
  }
}

export default MusicList
