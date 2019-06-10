import React, {PureComponent} from 'react'
import Scroll from '../../containers/Scroll'
import Loading from '../../containers/Loading'
import './index.scss'

class MusicList extends PureComponent {
  back = () => {
    this.props.back()
  }

  render() {
    const {singer, songList} = this.props
    singer.avatar = singer.avatar && singer.avatar.replace('150x150', '500x500')
    return (
      <div className="music-list">
        <div className="header">
          <div className="back" onClick={this.back}>
            <i className="iconfont iconfanhui5"/>
          </div>
          <h1 className="title">
            {singer.name}
          </h1>
          <div className="bg-image" style={{backgroundImage: `url(${singer.avatar})`}}>
            <div className="mask"/>
            <div className="play-wrapper">
              <div className="play">
                <i className="iconfont iconbofang1"/>
                <span>随机播放全部</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-layer" ref="bgLayer"/>
        <div className="list-wrapper scroll-view">
          {
            songList.length ? <Scroll className="scroll-content">
              <div className="song-list">
                {
                  songList.map(song => (
                    <dl className="song-list-item" key={song.mid}>
                      <dt>{song.name}</dt>
                      <dd>
                        <i className="iconfont iconzhuanji"/>
                        {song.singer} · {song.album}
                      </dd>
                    </dl>
                  ))
                }
              </div>
            </Scroll> : <Loading/>
          }
        </div>
      </div>
    )
  }
}

export default MusicList
