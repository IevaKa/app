import React, { Component } from 'react';
import { signup } from '../services/auth';

export default class Signup extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    message: '',
    role: 'Student'
  };

  handleChange = event => {
    const target = event.target
    const name = target.name
    const value = target.value
    this.setState({
      [name]: value
    })
    console.log(this.state)
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
        this.props.history.push('/tickets');
      }
    });
  };

  render() {
    return (
      <>
        <h2>Signup</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="radio" 
              name="role" 
              id="Student" 
              value={this.state.role}
              checked={this.state.role === 'Student'}
              onChange={this.handleChange} 
              />
            <label className="form-check-label" htmlFor="Student">
              Student
            </label>
          </div>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="radio" 
              name="role" 
              id="Teacher" 
              checked={this.state.role === 'Teacher'}
              value={this.state.role}
              onChange={this.handleChange} 
              />
            <label className="form-check-label" htmlFor="Teacher">
              Teacher
            </label>
          </div>
          <div className="form-group">
            <label htmlFor='username'>Username</label>
            <input
              className="form-control"
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleChange}
              id='username'
            />
          </div>
          <div className="form-group">
            <label htmlFor='name'>Full Name</label>  
            <input
              type='text'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
              id='name'
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor='password'>Password</label>  
            <input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              id='password'
              className="form-control"
            />
          </div>
          {this.state.message && (
          <div className="alert alert-primary" role="alert">
            {this.state.message}
          </div>
          )}
          <button type="submit" className="btn btn-primary">Signup</button>
        </form>
      </>
    );
  }
}