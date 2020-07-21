import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar as Nav } from 'react-bootstrap';
import { logout } from '../services/auth';

export default function Navbar() {
  return (
    <Nav className='nav justify-content-end' bg='primary'>
      <Nav.Brand>
        <Link to='/'>Home</Link>
      </Nav.Brand>
      <Nav.Brand>
        <Link to='/logout' onClick={logout}>Logout</Link>
      </Nav.Brand>
      <Nav.Brand>
        <Link to='/tickets'>Tickets</Link>
      </Nav.Brand>
      <Nav.Brand>
        <Link to='/tickets/create'>Create a ticket</Link>
      </Nav.Brand>
    </Nav>
  )
}
