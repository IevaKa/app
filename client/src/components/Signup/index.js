import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { signup } from '../../services/auth.js';

export default class Signup extends Component {
  state = {
    username: '',
    name: '',
    password: '',
    message: '',
    role: 'Student'
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };


  handleSubmit = event => {
    event.preventDefault();
    const { username, password, name, role } = this.state;

    signup(username, password, name, role).then(data => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: '',
          password: '',
          name: '',
          role: 'Student'
        });
      } else {
        this.props.setUser(data);
        this.props.history.push('/ticket/board');
      }
    });
  };

  render() {
    return (
      <>
        <h2>Signup</h2>
        <Form onSubmit={this.handleSubmit}>
        <label>
            <input
              type="radio"
              value="Student"
              name="role"
              checked={this.state.role === "Student"}
              onChange={this.handleChange}
            />
            Student 
          </label>
          <label>
            <input
              type="radio"
              value="Teacher"
              name="role"
              checked={this.state.role === "Teacher"}
              onChange={this.handleChange}
            />
            Teacher
          </label>
          <Form.Group>
            <Form.Label htmlFor='username'>Username: </Form.Label>
            <Form.Control
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleChange}
              id='username'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='name'>Full name: </Form.Label>
            <Form.Control
              type='text'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
              id='name'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='password'>Password: </Form.Label>
            <Form.Control
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              id='password'
            />
          </Form.Group>
          {this.state.message && (
            <Alert variant='danger'>{this.state.message}</Alert>
          )}
          <Button type='submit'>Signup</Button>
        </Form>
      </>
    );
  }
}