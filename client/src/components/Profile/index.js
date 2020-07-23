import React, { Component } from 'react';
import ProfileEdit from '../ProfileEdit';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
    return (
      <div>
        <h1>Welcome</h1>
        <h1>{this.state.user.name}</h1>

        <div>
          <Link to={`/ticket/board`}>Navigate back to the Board</Link>
        </div>

        {/* Editing */}
        <Button onClick={this.toggleEditForm}>Show Edit Form</Button>
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
