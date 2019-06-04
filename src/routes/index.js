import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Recommend from '../components/Recommend'
import Rank from '../components/Rank'
import Singer from '../components/Singer'
import Search from '../components/Search'

const routes = (
  <Switch>
    <Route path='/recommend' component={Recommend}/>
    <Route path='/singer' component={Singer}/>
    <Route path='/rank' component={Rank}/>
    <Route path='/search' component={Search}/>
    <Redirect from='/' to='/recommend'/>
  </Switch>
)

export default routes
