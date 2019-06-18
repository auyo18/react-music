import React, {PureComponent} from 'react'
import {connect} from "react-redux"
import {songtype, songmid} from "../../config"
import {getVKey} from "../../api/song"
import {setVKey} from "../Player/store/actions"
import './index.scss'

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
    }
  }

  render() {
    return (
      <header className="header">
        <div className="logo"/>
        <h1>聚力音乐</h1>
        <i className="iconfont icongeren"/>
      </header>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setVKey(vKey) {
    dispatch(setVKey(vKey))
  }
})

export default connect(null, mapDispatchToProps)(Header)
