import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import routes from './routes'
import Header from './components/Header'
import Tab from './components/Tab'
import './app.scss'

function App() {
  return (
    <Router>
      <div className="app">
        <Header/>
        <Tab/>
        {
          routes
        }
      </div>
    </Router>
  )
}

export default App
