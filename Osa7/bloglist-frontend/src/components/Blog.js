/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const removePressed = () => {
    blogService.remove(blog.id)
    window.location.reload()
  }

  const liked = () => {
    const blogObject = {
      id: blog.id,
      title: blog.title,
      likes: blog.likes + 1,
      author: blog.author,
      url: blog.url
    }

    blogService.update(blog.id, blogObject)
    window.location.reload()
  }

  if (visible === true && user.username === blog.user.username && user.username) {
    return (
      <div style={blogStyle} className='renderedDiv'>
        <div onClick={() => toggleVisibility()}>
          {blog.title} {blog.author}
        </div>
        <br></br>
        {blog.url}
        <br></br>
        This blog has {blog.likes} likes{' '}
        <button onClick={() => liked()}>Like</button>
        <br></br>
        added by: {blog.user.name}
        <div>
          <button onClick={() => removePressed()}>Remove this blog</button>
        </div>
      </div>
    )
  }
  if (visible === true) {
    return (
      <div style={blogStyle} className='renderedDiv'>
        <div onClick={() => toggleVisibility()} className='divtoclick'>
          {blog.title} {blog.author}
        </div>
        <br></br>
        {blog.url}
        <br></br>
        This blog has {blog.likes} likes{' '}
        <button onClick={() => liked()}>Like</button>
        <br></br>
        added by: {blog.user.name}
      </div>
    )
  }
  return (
    <div style={blogStyle} className='renderedDiv'>
      <div onClick={() => toggleVisibility()} className='divtoclick'>
        {blog.title} {blog.author}
      </div>
    </div>
  )
}

export default Blog