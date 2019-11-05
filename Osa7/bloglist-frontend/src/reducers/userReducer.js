/* eslint-disable linebreak-style */
import userService from '../services/user'

const userReducer = (state = [], action) => {
  switch(action.type){
  case 'INITU':
    state = state.concat(action.content)
    return state
  default:
    return state
  }
}

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INITU',
      content: users,
    })
  }
}


export default userReducer