/* eslint-disable linebreak-style */
import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className='titleDiv'>
      {blog.title} {blog.author}
    </div>
    <div className='likeDiv'>
      blog has {blog.likes} likes
      <button onClick={onClick} className='likeButton'>like</button>
    </div>
  </div>
)

export default SimpleBlog