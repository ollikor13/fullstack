    
import React from 'react'
import './Notification.css'

const Notification = ({ message, errorType }) => {
  if (message === null || message === '' ) {
    return null
  }else if(errorType===true){
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