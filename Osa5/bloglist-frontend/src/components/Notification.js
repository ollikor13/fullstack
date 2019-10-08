/* eslint-disable linebreak-style */

import React from 'react'
import './Notification.css'

const Notification = ({ message, error }) => {
  if (message === null || message === '' ) {
    return null
  }else if(error===true){
    return (
      <div className="error">
        {message}
      </div>
    )
  }else{
    return (
      <div className="message">
        {message}
      </div>
    )
  }
}

export default Notification