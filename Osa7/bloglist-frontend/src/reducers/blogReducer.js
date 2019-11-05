/* eslint-disable linebreak-style */
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type){
  case 'INIT':
    return action.content
  case 'NEW':
    state = state.concat(action.content)
    return state
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      content: blogs,
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    dispatch({
      type: 'NEW',
      content: content,
    })
  }
}


export default blogReducer