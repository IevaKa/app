import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar as Nav } from 'react-bootstrap';
import { logout } from '../../services/auth.js';

const handleLogout = props => {
  logout().then(() => {
    props.setUser(null);
  });
}

export default function Navbar(props) {
  return (
    <Nav className='navbar navbar-expand-lg navbar-light bg-light justify-content-end '>
      {props.user && <Nav.Brand>Welcome {props.user.username} </Nav.Brand>}
      <Nav.Brand>
        <Link to='/'>Home</Link>
      </Nav.Brand>
      {props.user ? (
        <>
          <Nav.Brand>
            <Link to='/projects'>Projects</Link>
          </Nav.Brand>
          <Nav.Brand>
            <Link to='/' onClick={() => handleLogout(props)}>Logout</Link>
          </Nav.Brand>
        </>
      ) : (
          <Nav.Brand>
            <Link to='/signup'>
              Signup 
          </Link>
            <Link to='/login'>
              Login
          </Link>
          </Nav.Brand>
        )}
    </Nav>
  )
}
