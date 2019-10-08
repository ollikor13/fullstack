/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks/index'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState(false)
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //const [newTitle, setNewTitle] = useState('')
  //const [newAuthor, setNewAuthor] = useState('')
  //const [newUrl, setNewUrl] = useState('')

  const username = useField('text')
  const password = useField('password')
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value,
      id: blogs.length + 1,
    }

    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setErrorType(false)
        setErrorMessage('A new blog: ' + newTitle.value + ' was added!')
        newTitle.resetValue()
        newAuthor.resetValue()
        newUrl.resetValue()
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  /*const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }*/

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.setValue('')
      password.setValue('')
    } catch (exception) {
      setErrorType(true)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin} >
      <div>
        username
        <input
          type={username.type}
          value={username.value}
          onChange={username.onChange}
        />
      </div>
      <div>
        password
        <input
          type={password.type}
          value={password.value}
          onChange={password.onChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const resetAll = () => {
    newTitle.resetValue()
    newAuthor.resetValue()
    newUrl.resetValue()
  }

  const blogForm = () => (
    <div>
      <h1>Create new blog</h1>
      <form onSubmit={addBlog}>
      Title <input
          type={newTitle.type}
          value={newTitle.value}
          onChange={newTitle.onChange}
        />
        <br></br>
      Author <input
          type={newAuthor.type}
          value={newAuthor.value}
          onChange={newAuthor.onChange}
        />
        <br></br>
      Url <input
          type={newUrl.type}
          value={newUrl.value}
          onChange={newUrl.onChange}
        />
        <br></br>
        <button type="submit">Submit</button>
      </form>
      <br></br>
      <button onClick={resetAll}>Reset</button>
    </div>
  )

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }


  if (user === null) {
    return (
      <div className="loginDiv">
        <Notification message={errorMessage} error={errorType} />
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      </div>
    )
  }

  return (
    <div className="MainDiv">
      <Notification message={errorMessage} error={errorType}/>
      <h1>Blogs</h1>
      <p>{user.name} logged in
        <button onClick={() => logOut()}>Logout</button>
      </p>
      <Togglable buttonLabel="Add new blog">
        {blogForm()}
      </Togglable>
      <h2>Blogs:</h2>
      {blogs.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes)).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
}

export default App
