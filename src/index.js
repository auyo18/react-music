import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import fastclick from 'fastclick'
import './assets/styles/index.scss'

fastclick.attach(document.body)

ReactDOM.render(<App/>, document.getElementById('root'))
