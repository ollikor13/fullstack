/* eslint-disable linebreak-style */
import React from 'react'
import { connect } from 'react-redux'
import { logOut } from '../reducers/loginReducer'
import './Menu.css'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Menu = (props) => {

  const logOut = () => {
    props.logOut()
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }

  return(
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Nav.Link href="/">blogs</Nav.Link>
        <Nav.Link href="/users">users</Nav.Link>
      </Nav>
      <Navbar.Text>
      Signed in as: {props.user.name} {''}
        <Button variant="outline-info" onClick={() => logOut()}>Logout</Button>
      </Navbar.Text>
    </Navbar>
  )
}

const mapDispatchToProps = {
  logOut
}

export default connect(null,
  mapDispatchToProps
)(Menu)
