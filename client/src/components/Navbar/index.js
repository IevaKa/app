import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar as Nav } from 'react-bootstrap';
import { logout } from '../../services/auth.js';
import axios from 'axios';



export default class Navbar extends React.Component {

  handleLogout = () => {
    logout().then(() => {
      this.props.setUser(null);
    });
  }

  state = {
    username: '',
    role: '',
    name: '',
    image: '',
    userId: ''
  }

  getData = () => {
    axios.get('/api/user').then(response => {
      this.setState({
        username: response.data.username,
        role: response.data.role,
        name: response.data.name,
        image: response.data.image,
        userId: response.data[0]._id
      })
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount = () => {
    this.getData()
  }




  render() {
    // console.log('Iam here')
    // console.log(this.state.username)
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
            <Link to={`/profile/${this.state.userId}`}>Profile</Link>
          </Nav.Brand>
        </>

      </Nav>
    )
  }
}
