/* eslint-disable linebreak-style */
import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const style = {
    margin: 20
  }

  return (
    <div>
      <div style={style}>
        <Link  key={blog.id} to={`/blogs/${blog.id}`}>{blog.title} </Link> {blog.author}
      </div>
    </div>
  )
}

export default Blog