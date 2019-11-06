/* eslint-disable linebreak-style */
import React, { useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import './App.css'
import { useField } from './hooks/index'
import { connect } from 'react-redux'
import { setNotification }  from './reducers/notificationReducer'
import { createBlog, initBlogs } from './reducers/blogReducer'
import { logIn, setUser } from './reducers/loginReducer'
import Menu from './components/Menu'
import { Table, Button, Form, Accordion, Card } from 'react-bootstrap'

const App = (props) => {

  const username = useField('text')
  const password = useField('password')
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')

  useEffect(() => {
    props.initBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value,
      id: props.blogs.length + 1,
    }
    const newBlog = await blogService.create(blogObject)
    props.createBlog(newBlog)
    props.setNotification(('A new blog: ' + newTitle.value + ' was added!'), false, 5)
    resetAll()
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      props.logIn(user)
      window.location.reload()
    } catch (exception) {
      props.setNotification(('wrong credentials'), true, 5)
    }
  }

  const loginForm = () => (
    <Form onSubmit={handleLogin}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type={username.type} value={username.value} onChange={username.onChange} placeholder="Username" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type={password.type} value={password.value} onChange={password.onChange} placeholder="Password" />
      </Form.Group>
      <Button type="submit" variant="secondary">Login</Button>
    </Form>
  )

  const resetAll = () => {
    newTitle.resetValue()
    newAuthor.resetValue()
    newUrl.resetValue()
  }

  const blogForm = () => (
    <div>
      <h1>Create new blog</h1>
      <Form onSubmit={addBlog}>
        <Form.Group >
          <Form.Label>Title</Form.Label>
          <Form.Control id='title' type={newTitle.type} value={newTitle.value} onChange={newTitle.onChange} placeholder="Title" />
        </Form.Group>

        <Form.Group >
          <Form.Label>Author</Form.Label>
          <Form.Control id='author' type={newAuthor.type} value={newAuthor.value} onChange={newAuthor.onChange} placeholder="Author" />
        </Form.Group>
        <Form.Group >
          <Form.Label>Url</Form.Label>
          <Form.Control id='url' type={newUrl.type} value={newUrl.value} onChange={newUrl.onChange} placeholder="Url" />
        </Form.Group>
        <Button type="submit" variant="secondary">Submit</Button>
        <Button onClick={resetAll} variant="secondary">Reset</Button>
      </Form>
    </div>
  )

  if (props.user.username === '') {
    return (
      <div className="MainDiv">
        <Notification />
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      </div>
    )
  }

  return (
    <div className="MainDiv">
      <Notification/>
      <Menu user={props.user} />
      <h1>Blogs</h1>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              <Button variant="secondary">Add a new blog</Button>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            {blogForm()}
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <h2>Blogs:</h2>
      <Table striped>
        <tbody>
          {props.blogs.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes)).map(blog =>
            <tr key={blog.id}>
              <td>
                <Blog key={blog.id} blog={blog} user={props.user} />
              </td>
            </tr>)}
        </tbody>
      </Table>

    </div>
  )
}

/*      {props.blogs.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes)).map(blog =>
        <Blog key={blog.id} blog={blog} user={props.user} />
      )}*/

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  setNotification,
  createBlog,
  initBlogs,
  logIn,
  setUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
