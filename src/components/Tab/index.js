import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import './index.scss'

class Tab extends Component {
  render() {
    return (
      <section className="tabs">
        <NavLink to="/recommend" className="tab">
          <span>推荐</span>

        </NavLink>
        <NavLink to="/singer" className="tab">
          <span>歌手</span>

        </NavLink>
        <NavLink to="/rank" className="tab">
          <span>排行</span>

        </NavLink>
        <NavLink to="/search" className="tab">
          <span>搜索</span>
        </NavLink>
      </section>
    )
  }
}

export default Tab
