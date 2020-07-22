import React from 'react'
import { login } from '../../services/auth';

export default class Login extends React.Component {
  state = {
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

    const { username, password } = this.state;

    login(username, password).then(data => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: '',
          password: ''
        });
      } else {
        // successfully logged in
        // update the state for the parent component
        this.props.setUser(data);
        this.props.history.push('/dashboard');
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor='username'>Username</label>
          <input
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleChange}
              id='username'
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
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    )
  }
}