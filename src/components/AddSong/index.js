import React, {PureComponent} from 'react'
import SearchBox from '../../containers/SearchBox'
import Suggest from "../Suggest"
import Switches from '../../containers/Switches'
import Scroll from '../../containers/Scroll'
import SearchHistory from '../../containers/SearchHistory'
import SongList from '../../containers/SongList'
import './index.scss'
import {connect} from "react-redux"

class AddSong extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      keyword: '',
      searchResults: [],
      switches: ['最近播放', '搜索历史'],
      switchIndex: 0
    }
  }

  changeKeyword = keyword => {
    this.setState(() => ({
      keyword
    }))
  }
  hideAddSong = () => {
    this.props.hideAddSong()
  }

  changeSwitchIndex = index => {
    this.setState(() => ({
      switchIndex: index
    }))
  }

  render() {
    const {showAddSong, history, playHistory, searchHistory} = this.props
    const {keyword, searchResults, switches, switchIndex} = this.state
    return (
      <div className={`add-song fixed-container ${showAddSong ? 'show' : 'hide'}`}>
        <div className="header">
          <h2 className="title">添加歌曲到列表</h2>
          <div className="close" onClick={e => {
            e.stopPropagation()
            this.hideAddSong()
          }}>
            <i className="iconfont iconshanchu2"/>
          </div>
        </div>
        <div className="search">
          <SearchBox
            keyword={keyword}
            changeKeyword={this.changeKeyword}/>
          <div className="scroll-view fixed-container suggest-wrapper"
               style={keyword ? {} : {display: 'none'}}>
            <Suggest
              keyword={keyword}
              searchResults={searchResults}
              history={history}
              style={keyword ? {} : {display: 'none'}}/>
          </div>
        </div>
        <div className="shortcut" style={keyword ? {visibility: 'hidden'} : {}}>
          <Switches
            switches={switches}
            currentIndex={switchIndex}
            changeSwitchIndex={this.changeSwitchIndex}/>

          <div className="scroll-view fixed-container shortcut-box">
            <Scroll className="scroll-content" data={playHistory}
                    style={switchIndex === 0 ? {} : {visibility: 'hidden'}}>
              <div className="play-history-wrapper">
                <SongList songList={playHistory}/>
              </div>
            </Scroll>
            <Scroll className="scroll-content" data={searchHistory}
                    style={switchIndex === 1 ? {} : {visibility: 'hidden'}}>
              <div className="search-history-wrapper">
                <SearchHistory changeKeyword={this.changeKeyword}/>
              </div>
            </Scroll>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searchHistory: state.search.searchHistory,
  playHistory: state.player.playHistory
})

export default connect(mapStateToProps, null)(AddSong)
