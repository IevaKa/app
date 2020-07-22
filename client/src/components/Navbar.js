import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar as Nav } from 'react-bootstrap';
import { logout } from '../services/auth';


export default class Navbar extends React.Component {
  
  handleLogout = () => {
    console.log('handlelogout')
    logout()
    this.props.history.push('/tickets');
  }

  render() {
  return (
    <Nav className='nav justify-content-end' bg='primary'>
      <Nav.Brand>
        <Link to='/'>Home</Link>
      </Nav.Brand>
      <Nav.Brand>
        <Link to='/logout' onClick={this.handleLogout}>Logout</Link>
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
}
