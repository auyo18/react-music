import React, {Component} from 'react'
import './index.scss'

class Header extends Component {
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

export default Header
