import React, {PureComponent} from 'react'
import {connect} from "react-redux"
import {selectPlay} from "../../components/Player/store/actions"
import {shuffle} from "../../utils"
import {playMode} from "../../config"
import './index.scss'

class SongList extends PureComponent {

  render() {
    const {mode, songList, selectPlay} = this.props
    return (
      <div className="song-list">
        {
          songList.map((song, index) => (
            <dl className="song-list-item" key={song.mid} onClick={() => {
              selectPlay(songList, index, mode, song.id)
            }}>
              <dt>{song.name}</dt>
              <dd>
                <i className="iconfont iconzhuanji"/>
                {song.singer}{song.album.trim() ? ' · ' + song.album : ''}
              </dd>
            </dl>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  mode: state.player.mode
})

const mapDispatchToProps = dispatch => ({
  selectPlay(list, index, mode, id) {
    let playList = list
    const sequenceList = list
    if (playMode[mode].name === 'random') {
      playList = shuffle(list)
      index = playList.findIndex(item => (item.id === id))
    }
    dispatch(selectPlay(playList, sequenceList, index))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SongList)
