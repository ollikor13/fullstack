import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if(props.notification.notification !== undefined && props.notification.notification !== ''){
    setTimeout(props.voted, 5000)
    return (
      <div style={style}>
        {props.notification.notification}
      </div>
    )
  }
  return (
    <div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notifications
  }
}

/*const mapDispatchToProps = {
  voted,
}*/

export default connect(
  mapStateToProps,
  )(Notification)