import React from 'react'
import {HashRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import routes from './routes'
import Header from './components/Header'
import Tab from './components/Tab'
import store from './store'
import './app.scss'

const App = () => (
  <Provider store={store}>
    <Router>
      <div id="app">
        <Header />
        <Tab />
        {
          routes
        }
      </div>
    </Router>
  </Provider>
)

export default App
