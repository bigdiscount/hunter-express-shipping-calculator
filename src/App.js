import React from 'react'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import './App.css'
import Home from './components/home/home.component'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
