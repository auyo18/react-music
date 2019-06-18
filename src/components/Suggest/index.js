import React, {PureComponent, Fragment} from 'react'
import Scroll from '../../containers/Scroll'
import Loading from '../../containers/Loading'
import {getSearchSongs} from "../../api/search"
import {CreateSong} from "../../utils/singer"
import {connect} from "react-redux"
import {searchHistory} from "../Search/store/actions"
import {setPlayList, setSequenceList, setCurrentIndex, setFullScreen} from "../Player/store/actions"
import './index.scss'

const SEARCH_HISTORY_MAX_LENGTH = 20

class Suggest extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      pullup: true,
      showLoading: false,
      singer: {}
    }
    this.page = 1
    this.noMore = false
  }

  componentDidMount() {
    console.log(this.props)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.page = 1
    this.noMore = false

    if (nextProps.keyword && nextProps.keyword !== this.props.keyword) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.searchSongs()
      }, 500)
    }

    if (!nextProps.keyword) {
      this.setState(() => ({
        searchResults: [],
        singer: {}
      }))
    }
  }

  searchSongs = async () => {
    if (!this.props.keyword) return
    this.setState(() => ({
      showLoading: true
    }))
    let {data} = await getSearchSongs(this.props.keyword, this.page)
    if (data.song.curnum * data.song.curpage >= data.song.totalnum) {
      this.noMore = true
    }

    if (this.props.showSinger && data.zhida.type === 1) {
      const {zhida_singer} = data.zhida
      const singer = {
        id: zhida_singer.singerMID,
        name: zhida_singer.singerName,
        avatar: zhida_singer.singerPic,
        albumNum: zhida_singer.albumNum,
        songNum: zhida_singer.songNum
      }
      this.setState(() => ({
        singer
      }))
    } else {
      this.setState(() => ({
        singer: {}
      }))
    }
    this.setState(() => ({
      searchResults: this.normalizeSongs(data.song.list)
    }))
    this.setState(() => ({
      showLoading: false
    }))
  }

  normalizeSongs = list => {
    let ret = []
    list.forEach(item => {
      ret.push(CreateSong({
        songid: item.id,
        songmid: item.file.media_mid,
        songname: item.title,
        albumname: item.album.name,
        albummid: item.album.mid,
        singer: item.singer,
        interval: item.interval
      }, this.props.vKey))

    })
    return ret
  }

  scrollToEnd = () => {
    this.searchMore()
  }

  searchMore = async () => {
    if (!this.props.keyword) return
    if (this.noMore) return
    this.setState(() => ({
      showLoading: true
    }))
    this.page++
    let {data} = await getSearchSongs(this.props.keyword, this.page)
    if (data.song.curnum * data.song.curpage >= data.song.totalnum) {
      this.noMore = true
    }
    this.setState(() => ({
      searchResults: [...this.state.searchResults, ...this.normalizeSongs(data.song.list)]
    }))
    this.setState(() => ({
      showLoading: false
    }))
  }

  selectSinger = () => {
    this.props.history.push({
      pathname: `/search/${this.state.singer.id}`,
      state: {entry: 'search', singer: this.state.singer}
    })
  }

  render() {
    const {playList, sequenceList, currentIndex, keyword, searchHistory} = this.props
    const {singer} = this.state
    return (
      <Fragment>
        <Scroll
          ref={this.props.forwardRef}
          className="suggest scroll-content"
          data={this.state.searchResults}
          pullup={this.state.pullup}
          scrollToEnd={this.scrollToEnd}>
          <div className="list">
            {
              this.state.singer.name && <div
                className="singer"
                onClick={this.selectSinger}
              >
                <div className="avatar" key={singer.id}>
                  <img src={singer.avatar} alt=""/>
                </div>
                <div className="text">
                  <div className="name">
                    歌手：{singer.name}
                  </div>
                  <div className="desc">
                    <span>单曲:{singer.songNum}</span>&nbsp;
                    <span>专辑:{singer.albumNum}</span>
                  </div>
                </div>
              </div>
            }
            {
              this.state.searchResults.length > 0 && this.state.searchResults.map(item => (
                <div
                  className="item"
                  key={item.id}
                  onClick={() => {
                    this.props.insertSong(playList, sequenceList, currentIndex, item)
                    this.props.setSearchHistory(keyword, searchHistory)
                  }}
                >
                  <div className="icon">
                    <i className="iconfont iconyinle"/>
                  </div>
                  <div className="text">
                    <div className="name">
                      {item.name}
                    </div>
                    <div className="singer">
                      {item.singer} · {item.album}
                    </div>
                  </div>
                </div>
              ))
            }
            <p style={this.noMore && this.state.searchResults.length ? {} : {visibility: 'hidden'}}
               className="no-more">没有更多...</p>
            <Loading title={''} style={this.state.showLoading ? {} : {visibility: 'hidden'}}/>
          </div>
        </Scroll>
        <div
          className="no-result-wrapper"
          style={!this.state.searchResults.length && this.noMore ? {} : {display: 'none'}}>
          <p className="no-result">抱歉，暂无搜索结果</p>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  playList: state.player.playList,
  sequenceList: state.player.sequenceList,
  currentIndex: state.player.currentIndex,
  vKey: state.player.vKey,
  searchHistory: state.search.searchHistory
})

const mapDispatchToProps = dispatch => ({
  insertSong(playList, sequenceList, currentIndex, song) {
    let _playList = playList.slice()
    let _sequenceList = sequenceList.slice()

    // 插入的位置 当前播放歌曲后面
    let index = currentIndex + 1
    const pIndex = _playList.findIndex(item => item.id === song.id)

    _playList.splice(index, 0, song)

    // 插入的歌曲已存在播放列表
    if (pIndex > -1) {
      // 插入的位置在已存在歌曲的后面
      if (index > pIndex) {
        _playList.splice(pIndex, 1)
        index--
      }
      // 插入的位置在已存在歌曲的前面
      else {
        _playList.splice(pIndex + 1, 1)
      }
    }

    const sIndex = _sequenceList.findIndex(item => item.id === song.id)
    _sequenceList.splice(currentIndex + 1, 0, song)

    // 插入的歌曲已存在歌曲列表
    if (sIndex > -1) {
      // 插入的位置在已存在歌曲的后面
      if (currentIndex + 1 > sIndex) {
        _sequenceList.splice(pIndex, 1)
      }
      // 插入的位置在已存在歌曲的前面
      else {
        _sequenceList.splice(sIndex + 1, 1)
      }
    }

    dispatch(setPlayList(_playList))
    dispatch(setSequenceList(_sequenceList))
    dispatch(setCurrentIndex(index))
    dispatch(setFullScreen(true))
  },
  setSearchHistory(keyword, list) {
    let _list = list.slice()
    const index = _list.findIndex(item => item === keyword)
    if (index === 0) return
    if (index > 0) {
      _list.splice(index, 1)
    }
    _list.unshift(keyword)
    if (_list.length > SEARCH_HISTORY_MAX_LENGTH) {
      _list.pop()
    }
    dispatch(searchHistory(_list))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Suggest)
