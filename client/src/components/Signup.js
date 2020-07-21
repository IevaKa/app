import React, { Component } from 'react';
import { signup } from '../services/auth';

export default class Signup extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    message: ''
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username, password, name } = this.state;

    signup(username, password, name).then(data => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: '',
          password: '',
          name: ''
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