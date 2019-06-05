import React from 'react'
import loadImg from '../../assets/images/loading.gif'
import './index.scss'

const Loading = props => (
    <div className="loading-container">
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
