import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar as Nav } from 'react-bootstrap';
import { logout } from '../../services/auth.js';
import axios from 'axios'


export default class Navbar extends React.Component {

  state = {
    user: null
  }

  getUser = () => {
    axios.get('/api/auth/loggedin')
    .then(response => {
      const user = response.data;
      this.setState({
        user: user,
      });
    })
  }

  componentDidMount = () => {
    this.getUser()
  }


  // handleLogout = () => {
  //   logout().then(() => {
  //     this.props.setUser(null);
  //   });
  // }
  render () {
    console.log('this is navbar ', this.state.user)
    if (!this.state.user) return (<></>)
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
            <Link to={`/profile/${this.state.user._id}`}>Profile</Link>
          </Nav.Brand>
          {/* <Nav.Brand>
            <Link to='/' onClick={() => handleLogout(props)}>Logout</Link>
          </Nav.Brand> */}
        </>  
    </Nav>
  )
}
}
