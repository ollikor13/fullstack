/* eslint-disable linebreak-style */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {  initUsers } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { logOut } from '../reducers/loginReducer'
import { initBlogs } from '../reducers/blogReducer'
import Menu from '../components/Menu'
import { Table } from 'react-bootstrap'


const User = (props) => {


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  useEffect(() => {
    props.initBlogs()
  }, [])

  const uid = window.location.href.split('/').pop()

  const userById = (uid) => {
    const apu = props.users.find(user => user.id === uid)
    return apu
  }

  const user = userById(uid)

  if( user !== undefined ){
    const blogstoshow = user.blogs
    return(
      <div>
        <Menu user={props.user} />
        <h1>Blogs</h1>
        <h1>{user.name}</h1>
        <b>Added blogs:</b>
        <Table striped>
          <tbody>
            {blogstoshow.map(blog => (
              <tr key={blog.id}>
                <td>
                  <p>{blog.title}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }

  if ( user === undefined) {
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    user: state.user,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  logOut,
  initUsers,
  initBlogs
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)