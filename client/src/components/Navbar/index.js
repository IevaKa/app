import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar as Nav } from 'react-bootstrap';
import { logout } from '../../services/auth.js';



export default class Navbar extends React.Component {
  handleLogout = () => {
    logout().then(() => {
      this.props.setUser(null);
    });
  }
  render () {
    // console.log(this.props.user.username)
  return (
    <Nav className='navbar navbar-expand-lg navbar-light bg-light justify-content-end '>
      {/* {this.props.user && 
      <Nav.Brand>Welcome {this.props.user.username} 
      </Nav.Brand>} */}
      {/* <Nav.Brand>
        <Link to='/'>Home</Link>
      </Nav.Brand> */}
        <>
          <Nav.Brand>
            <Link to='/ticket/add'>Add Ticket</Link>
          </Nav.Brand>
          <Nav.Brand>
            {/* <Link to={`/profile/${this.props.user.id}`}>Profile</Link> */}
            <Link to={`/profile`}>Profile</Link>
          </Nav.Brand>
          {/* <Nav.Brand>
            <Link to='/' onClick={() => handleLogout(props)}>Logout</Link>
          </Nav.Brand> */}
        </>
       
    </Nav>
  )
}
}
