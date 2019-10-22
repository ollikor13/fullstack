/* eslint-disable linebreak-style */

import { createStore } from 'redux'
import React from 'react'
import './Notification.css'

const notificationReducer = (state = '', action) => {
  if(action !== undefined){
    switch (action.type) {
    case 'NULL':
      return { ...state, notification: '' }
    case 'TESTI':
      return { ...state, notification: action.content }
    default:
      return state
    }
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch ({
      type: 'TESTI',
      content: message
    })
    setTimeout(() => {
      dispatch ({
        type: 'NULL'
      })}
    , time*1000)
  }
}

const store = createStore(notificationReducer)

const Notification = ({ message, error }) => {
  if (message === null || message === '' ) {
    store.dispatch({ type: 'NULL'})
    return null
  }else if(error===true){
    store.dispatch({ type: 'TESTI', content: message })
    return (
      <div className="error">
        {store.getState().notification}
      </div>
    )
  }else{
    store.dispatch({ type: 'TESTI', content: message })
    return (
      <div className="message">
        {store.getState().notification}
      </div>
    )
  }
}

export default Notification