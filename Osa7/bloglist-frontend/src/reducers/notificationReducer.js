/* eslint-disable linebreak-style */
const initialState = { notification: '', error: false }

const notificationReducer = (state = initialState, action) => {
  if(action !== undefined){
    switch (action.type) {
    case 'NULL':
      return { ...state, notification: '' }
    case 'TESTI':
      return { ...state, notification: action.content, error: action.error }
    default:
      return state
    }
  }
}

export const setNotification = (message, error, time) => {
  return async dispatch => {
    dispatch ({
      type: 'TESTI',
      content: message,
      error: error
    })
    setTimeout(() => {
      dispatch ({
        type: 'NULL'
      })}
    , time*1000)
  }
}


export default notificationReducer