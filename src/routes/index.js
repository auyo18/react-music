import React from 'react'
import Loadable from 'react-loadable'
import {Route, Switch, Redirect} from 'react-router-dom'
import Loading from '../containers/Loading'

const Recommend = Loadable({
  loader: () => import('../components/Recommend'),
  loading: Loading,
  timeout: 10000
})

const Rank = Loadable({
  loader: () => import('../components/Rank'),
  loading: Loading,
  timeout: 10000
})

const Singer = Loadable({
  loader: () => import('../components/Singer'),
  loading: Loading,
  timeout: 10000
})

const Search = Loadable({
  loader: () => import('../components/Search'),
  loading: Loading,
  timeout: 10000
})

const NotFound = Loadable({
  loader: () => import('../components/NotFound'),
  loading: Loading,
  timeout: 10000
})

const routes = (
  <Switch>
    <Route path="/recommend" component={Recommend} />
    <Route path="/singer" component={Singer} />
    <Route path="/rank" exact component={Rank} />
    <Route path="/search" exact component={Search} />
    <Redirect from="/" to="/recommend" exact />
    <Route component={NotFound} />
  </Switch>
)

export default routes
