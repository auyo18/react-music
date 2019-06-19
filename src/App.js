import React from 'react'
import {HashRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import routes from './routes'
import Header from './components/Header'
import Tab from './components/Tab'
import Player from './components/Player'
import store from './store'
import './app.scss'

const App = props => (
  <Provider store={store}>
    <Router>
      <div id="app">
        <Header />
        <Tab />
        {
          routes
        }
        <Player />
      </div>
    </Router>
  </Provider>
)

export default App
