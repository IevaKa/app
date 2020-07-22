import React, { Component } from 'react';
import ProfileEdit from '../ProfileEdit';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class index extends Component {

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

  render() {

    if (!this.state.user) return (<></>)
    console.log(this.state.user.username)
    return (
      <div>
        <h1>Welcome</h1>
        <h1>{this.state.user.username}</h1>
        
        <div>
          <Link to={`/profile/${this.state.user._id}/edit`}>Edit your profile</Link>
        </div>

        <Link to={`/ticket/board`}>Navigate back to the Board</Link>

      </div>
    )
  }
} 
