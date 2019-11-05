/* eslint-disable linebreak-style */
import blogService from '../services/blogs'
const initialState = {
  username: '',
  name: '',
  token: '',
}

const loginReducer = (state = initialState, action) => {
  switch(action.type){
  case 'LOGIN':
    return { ...state, username: action.content.username, name: action.content.name, token: action.content.token }
  case 'LOGOUT':
    return { ...state, username: initialState.username, name: initialState.name, token: initialState.token }
  case 'SET':
    return { ...state, username: action.content.username, name: action.content.name, token: action.content.token }
  case 'GET':
    return state
  default:
    return state
  }
}

export const logIn = (user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      content: user,
    })
  }
}

export const logOut = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      content: user,
    })
  }
}


export default loginReducer