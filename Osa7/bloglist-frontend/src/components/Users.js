/* eslint-disable linebreak-style */
import React, { useState, useEffect }  from 'react'
import userService from '../services/user'
import blogService from '../services/blogs'
import { connect } from 'react-redux'
import { setUser } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import { Table } from 'react-bootstrap'

const Users = (props) => {

  const styles = {
    margin: 32,
  }

  const [users, setUsers] = useState([])

  useEffect(() => {
    userService
      .getAll()
      .then(users => {
        setUsers(users)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if(props.user.username === ''){
    return (
      <div>
        <h1>Users</h1>
        <b style={styles}>blogs created</b>
        {users.map(user => <Link key={user.username} to={`/users/${user.id}`}>{user.name} {user.blogs.length}<br></br></Link>)}
      </div>
    )
  }
  return (
    <div>
      <Menu user={props.user} />
      <h1>Blogs</h1>
      <h1>Users</h1>

      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number of blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link key={user.username} to={`/users/${user.id}`}>{user.name}<br></br></Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
