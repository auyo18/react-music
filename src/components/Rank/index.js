import React, {PureComponent} from 'react'
import {connect} from "react-redux"
import {Route} from 'react-router-dom'
import Scroll from '../../containers/Scroll'
import {getTopList} from "./store/actions"
import './index.scss'
import Loadable from "react-loadable"
import Loading from "../../containers/Loading"

const TopList = Loadable({
  loader: () => import('../TopList'),
  loading: Loading,
  timeout: 10000
})

class Rank extends PureComponent {
  componentWillMount() {
    !this.props.topList.length && this.props.getTopList()
  }

  componentDidMount() {
    this.setBottom(this.props.playList)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setBottom(nextProps.playList)
  }

  setBottom = playList => {
    this.refs.rank.style.bottom = playList.length > 0 ? '50px' : ''
  }

  render() {
    const {topList} = this.props
    return (
      <div className="rank scroll-view fixed-container" ref="rank">
        <Scroll className="top-list-container scroll-content" data={topList}>
          <div className="top-list ">
            {
              topList && topList.map(item => (
                <div className="top-list-item" key={item.id} onClick={() => {
                  this.props.history.push({pathname: `/rank/${item.id}`, state: {item}})
                }}>
                  <div className="image">
                    <img src={item.picUrl} alt="" />
                  </div>
                  <div className="info">
                    <h2 className="title">
                      {item.topTitle}
                    </h2>
                    {
                      item.songList.map((song, index) => (
                        <p key={song.songname}>{index + 1} <span>{song.songname}</span> - {song.singername}</p>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </Scroll>
        <Route path={'/rank/:id'} exact component={TopList} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  topList: state.topList.topList,
  playList: state.player.playList
})
const mapDispatchToProps = dispatch => ({
  getTopList() {
    dispatch(getTopList())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Rank)
