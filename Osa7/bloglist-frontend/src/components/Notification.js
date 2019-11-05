/* eslint-disable linebreak-style */
import React from 'react'
import './Notification.css'
import { connect } from 'react-redux'

const Notification = (props) => {

  if (props.notification.notification === null || props.notification.notification === '' ) {
    return null
  }else if(props.notification.error===true){
    return (
      <div className="error">
        {props.notification.notification}
      </div>
    )
  }else{
    return (
      <div className="message">
        {props.notification.notification}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notifications
  }
}

export default connect(
  mapStateToProps,
)(Notification)