import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './index.css'
import 'react-loading-skeleton/dist/skeleton.css'

import { Collection } from './pages/Collection'
import { CreateCard } from './pages/CreateCard'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/collection" component={Collection} />
      <Route exact path="/create-card" component={CreateCard} />
    </Switch>
  </Router>
)

render(<App />, document.getElementById('root'))
