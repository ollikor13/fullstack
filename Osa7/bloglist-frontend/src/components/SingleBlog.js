/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react'
import { useField } from '../hooks/index'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { initBlogs } from '../reducers/blogReducer'
import { logOut } from '../reducers/loginReducer'
import Menu from '../components/Menu'

const SingleBlog = (props) => {

  const [comments, setComments] = useState([])
  const newcomment = useField('text')

  useEffect(() => {
    props.initBlogs()
  }, [])


  const bid = window.location.href.split('/').pop()

  const blogById = (bid) => {
    const apu = props.blogs.find(blog => blog.id === bid)
    return apu
  }

  const blog = blogById(bid)

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

  const comment = () => {
    const commentObject = {
      content: newcomment.value,
      blog: blog.id
    }
    blogService.newComment(blog.id, commentObject)
    window.location.reload()
  }

  useEffect(() => {
    blogService
      .getComments(bid)
      .then(comments => {
        setComments(comments)
      })
  }, [])

  const logOut = () => {
    props.logOut()
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }

  if(blog !== undefined){
    return(
      <div>
        <Menu user={props.user} />
        <h1>Blogs</h1>
        <h1><b>{blog.title}</b></h1>
        {blog.url}
        <br></br>
        This blog has {blog.likes} likes{' '}
        <button onClick={() => liked()}>Like</button>
        <br></br>
        added by: {blog.user.name}
        <h2>Comments:</h2>
        <input
          type={newcomment.type}
          value={newcomment.value}
          onChange={newcomment.onChange}
        />
        <button onClick={() => comment()}>Add comment</button>
        <ul>
          {comments.filter(comment => comment.blog === blog.id).map(comment => <li key={comment.id}>{comment.content}</li>)}
        </ul>
      </div>
    )
  }
  return(
    <div></div>
  )

}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  initBlogs,
  logOut
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleBlog)
