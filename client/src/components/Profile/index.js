import React, { Component } from 'react';
import ProfileEdit from '../ProfileEdit';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Navbar from '../Navbar/index';

export default class index extends Component {

  state = {
    user: '',
    editForm: false,
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

  // Editing

  handleChange = event => {
    console.log(event.target)
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const id = this.props.match.params.id;
    axios.put(`/api/auth/loggedin/${id}`, {
      user: this.state.user,
    })
      .then(response => {
        console.log(response.data.name)
        this.setState({
          user: response.data,
          editForm: false
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  toggleEditForm = () => {
    this.setState({
      editForm: !this.state.editForm
    })
  }


  render() {

    if (!this.state.user) return (<></>)
    console.log(this.state.user)
    return (
      <div>
        <Navbar />
        {this.state.user.role === 'Student' ? <h1>Hello Ironhacker</h1> : <h1>Dear TA Welcome back</h1>}
        <h3>Username: {this.state.user.username}</h3>
        <h3>Name: {this.state.user.name}</h3>
        <h3>{this.state.user.role}</h3>

        <h3>
          <Link to={`/ticket/board`}>Navigate back to the Board</Link>
        </h3>

        {/* Editing */}
        <Button onClick={this.toggleEditForm}>Edit your name</Button>
        {this.state.editForm && (
          <ProfileEdit
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )}

      </div>
    )
  }
} 
