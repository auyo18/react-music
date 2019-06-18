import React, {PureComponent} from 'react'
import {Route} from 'react-router-dom'
import ListView from '../../containers/ListView'
import Loadable from "react-loadable"
import Loading from "../../containers/Loading"
import {connect} from "react-redux"
import {getSingerList} from "./store/actions"
import './index.scss'

const SingerDetail = Loadable({
  loader: () => import('../SingerDetail'),
  loading: Loading,
  timeout: 10000
})

class Singer extends PureComponent {
  componentWillMount() {
    !this.props.singerList.length && this.props.getSingerList()
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.refs.singer.style.bottom = nextProps.playList.length > 0 ? '50px' : ''
  }

  selectSinger = item => {
    this.props.history.push({pathname: `/singer/${item.id}`, state: {singer: item}})
  }

  render() {
    return (
      <div className="singer scroll-view fixed-container" ref="singer">
        <ListView
          selectItem={this.selectSinger}
          singerList={this.props.singerList}
          shortCutList={this.props.shortCutList} />
        <Route path='/singer/:id' exact component={SingerDetail} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singerList: state.singer.list,
  shortCutList: state.singer.shortCutList,
  playList: state.player.playList
})
const mapDispatchToProps = dispatch => ({
  getSingerList() {
    dispatch(getSingerList())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Singer)
