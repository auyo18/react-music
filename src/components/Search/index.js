import React, {PureComponent} from 'react'
import {Route} from 'react-router-dom'
import Scroll from '../../containers/Scroll'
import SearchBox from '../../containers/SearchBox'
import SearchHistory from '../../containers/SearchHistory'
import Suggest from '../Suggest'
import {hotKey} from "./store/actions"
import {connect} from "react-redux"
import {shuffle} from "../../utils"
import './index.scss'
import Loadable from "react-loadable"
import Loading from "../../containers/Loading"

const SingerDetail = Loadable({
  loader: () => import('../SingerDetail'),
  loading: Loading,
  timeout: 10000
})

const ROW_NUM = 3
const MARGIN_BOTTOM = 10

class Search extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      keyword: '',
      searchResults: [],
      hotKey: []
    }
    this.showSinger = true
  }

  componentWillMount() {
    if (this.props.hotKey.length) {
      this.setState(() => ({
        hotKey: shuffle(this.props.hotKey)
      }))
      setTimeout(() => {
        this.setHotKeyHeight()
      }, 0)
    } else {
      this.props.getHotKey()
    }
  }

  componentDidMount() {
    this.setBottom(this.props.playList)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setBottom(nextProps.playList)
    const hotKey = nextProps.hotKey
    if (hotKey !== this.props.hotKey) {
      this.setState(() => ({
        hotKey
      }))
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.setHotKeyHeight()
  }

  setBottom = playList => {
    this.refs.shortcutWrapper.style.bottom = playList.length > 0 ? '50px' : ''
    this.refs.suggestWrapper.style.bottom = playList.length > 0 ? '50px' : ''
  }

  setHotKeyHeight = () => {
    if (this.refs.hotKeyContent && this.refs.hotKeyContent.clientHeight > (this.refs.hotKeyContent.children[0].clientHeight + MARGIN_BOTTOM) * ROW_NUM) {
      const hotKey = this.state.hotKey
      hotKey.pop()
      this.setState(() => ({
        hotKey: hotKey
      }))
    }
  }

  changeKeyword = keyword => {
    this.setState(() => ({
      keyword
    }))
  }

  render() {
    return (
      <div className="search">
        <SearchBox
          keyword={this.state.keyword}
          changeKeyword={this.changeKeyword}/>
        <div ref="suggestWrapper" className="scroll-view fixed-container suggest-wrapper"
             style={this.state.keyword ? {} : {display: 'none'}}>
          <Suggest
            forwardRef={React.createRef()}
            keyword={this.state.keyword}
            searchResults={this.state.searchResults}
            history={this.props.history}
            showSinger={this.showSinger}
          />
        </div>
        <div
          ref="shortcutWrapper"
          className="scroll-view fixed-container shortcut-wrapper"
          style={this.state.keyword ? {visibility: 'hidden'} : {}}>
          <Scroll ref="shortcut" className="shortcut scroll-content" data={this.props.searchHistory}>
            <div>
              <div className="hot-key">
                <h2 className="title">热门搜索</h2>
                <div className="hot-key-content" ref="hotKeyContent">
                  {
                    this.state.hotKey && this.state.hotKey.map(key => (
                      <span ref="tag" className="tag" key={key.n} onClick={() => {
                        this.changeKeyword(key.k.trim())
                      }}>
                        {key.k.trim()}
                      </span>
                    ))
                  }
                </div>
              </div>
              <div className="search-history">
                <div className="header">
                  <h2 className="title">搜索历史</h2>
                  <i className="iconfont iconshanchu1"/>
                </div>
                <SearchHistory changeKeyword={this.changeKeyword}/>
              </div>
            </div>
          </Scroll>
        </div>
        <Route path='/search/:id' exact component={SingerDetail}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  playList: state.player.playList,
  hotKey: state.search.hotKey,
  searchHistory: state.search.searchHistory
})
const mapDispatchToProps = dispatch => ({
  getHotKey() {
    dispatch(hotKey())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
