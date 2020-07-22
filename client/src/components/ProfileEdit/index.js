import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export default class index extends Component {
  render() {
    return (
      <div>
        <h2>Edit profile: </h2>
        <Form onSubmit={this.props.handleSubmit}>
          <Form.Group>
            <Form.Label>User:</Form.Label>
            <Form.Control
              type='text'
              name='user'
              value={this.props.user.name}
              onChange={this.props.handleChange}
            />
          </Form.Group>
          <Button type='submit'>Edit</Button>
        </Form>
      </div>
    );
  }
}
