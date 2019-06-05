import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import fastclick from 'fastclick'
import './assets/styles/index.scss'

fastclick.attach(document.body)

// 阻止手指拖动事件
document.getElementById("root").addEventListener('touchmove', e => {
  e.preventDefault()
}, {passive: false})

ReactDOM.render(<App/>, document.getElementById('root'))
