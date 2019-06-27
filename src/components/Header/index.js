import React, {PureComponent} from 'react'
import {connect} from "react-redux"
import {withRouter} from 'react-router-dom'
import {songtype, songmid, storageKey} from "../../config"
import {getVKey} from "../../api/song"
import {setVKey, setPlayHistory, setFavoriteList} from "../Player/store/actions"
import './index.scss'

const storage = window.localStorage

class Header extends PureComponent {

  componentWillMount() {
    this.getVKey()
  }

  getVKey = async () => {
    let {req_0} = await getVKey(songmid, songtype)
    let vKey = []
    if (req_0 && req_0.data && req_0.data.midurlinfo) {
      vKey = req_0.data.midurlinfo.map(item => item.vkey)
    }
    if (vKey.length) {
      vKey = vKey.filter(item => item.trim().length)
      this.props.setVKey(vKey)
      if (!storage[storageKey.PLAY_HISTORY_KEY]) return
      let playHistory = JSON.parse(storage[storageKey.PLAY_HISTORY_KEY])
      if (playHistory.length) {
        playHistory.forEach(item => {
          item.url = item.url.replace(item.url.match(/vkey=(\w*)&/)[1], vKey[Math.round(Math.random() * (vKey.length - 1))])
        })
        this.props.setPlayHistory(playHistory)
      }

      if (!storage[storageKey.FAVORITE_LIST_KEY]) return
      let favoriteList = JSON.parse(storage[storageKey.FAVORITE_LIST_KEY])
      if (favoriteList.length) {
        favoriteList.forEach(item => {
          item.url = item.url.replace(item.url.match(/vkey=(\w*)&/)[1], vKey[Math.round(Math.random() * (vKey.length - 1))])
        })
        this.props.setFavoriteList(favoriteList)
      }
    }
  }

  goUser = () => {
    this.props.history.push({pathname: '/user', state: {entry: true}})
  }

  render() {
    return (
      <header className="header">
        <div className="logo"/>
        <h1>聚力音乐</h1>
        <i className="iconfont icongeren" onClick={this.goUser}/>
      </header>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setVKey(vKey) {
    dispatch(setVKey(vKey))
  },
  setPlayHistory(playHistory) {
    dispatch(setPlayHistory(playHistory))
  },
  setFavoriteList(favoriteList) {
    dispatch(setFavoriteList(favoriteList))
  }
})

export default connect(null, mapDispatchToProps)(withRouter(Header))
