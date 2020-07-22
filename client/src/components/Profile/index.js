import React, { Component } from 'react';
// import ProfileEdit from '../ProfileEdit';
import axios from 'axios';

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
      <h1>Profile Name</h1>
        <h1>{this.state.user.username}</h1>
        {/* <ProfileEdit /> */}
      </div>
    )
  }
} 
