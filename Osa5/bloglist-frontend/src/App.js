/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setNotes] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setNotes(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      id: blogs.length + 1,
    }

    blogService
      .create(blogObject)
      .then(data => {
        setNotes(blogs.concat(data))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setErrorType(false)
        setErrorMessage('A new blog: ' + newTitle + ' was added!', errorType)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorType(true)
      setErrorMessage('wrong credentials', errorType)
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
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <div>
      <h1>Create new blog</h1>
      <form onSubmit={addBlog}>
      Title <input
          value={newTitle}
          onChange={handleTitleChange}
        />
        <br></br>
      Author <input
          value={newAuthor}
          onChange={handleAuthorChange}
        />
        <br></br>
      Url <input
          value={newUrl}
          onChange={handleUrlChange}
        />
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  )

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }


  if (user === null) {
    return (
      <div className="loginDiv">
        <Notification message={errorMessage}/>
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      </div>
    )
  }

  return (
    <div className="MainDiv">
      <Notification message={errorMessage}/>
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
