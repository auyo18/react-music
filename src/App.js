import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import routes from './routes'
import Header from './components/Header'
import Tab from './components/Tab'
import store from './store'
import './app.scss'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div id="app">
          <Header/>
          <Tab/>
          {
            routes
          }
        </div>
      </Router>
    </Provider>
  )
}

export default App
