import React from 'react'
import loadImg from '../../assets/images/20130527034923893.gif'
import './index.scss'

const Loading = props => (
    <div className="loading-container fixed-container" style={props.style}>
      <div className="loading">
        <img src={loadImg} width="30" height="30" alt="" />
        <p className="desc">{props.title}</p>
      </div>
    </div>
)

Loading.defaultProps = {
  title: '正在加载...'
}

export default Loading
