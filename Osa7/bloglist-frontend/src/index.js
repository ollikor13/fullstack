/* eslint-disable linebreak-style */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import Users from './components/Users'
import User from './components/User'
import SingeBlog from './components/SingleBlog'
import store from './store'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Route exact path="/" render={() => <App />} />
        <Route exact path="/users" render={() => <Users/>} />
        <Route exact path="/users/:id" render={() => <User />} />
        <Route exact path="/blogs/:id" render={() => <SingeBlog />} />
      </Router>
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)