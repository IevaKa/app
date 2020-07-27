import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export default class index extends Component {
  render() {
    return (
      <>
        <Form onSubmit={this.props.handleSubmit}>
            <Form.Control
              type='text'
              name='user'
              value={this.props.user.name}
              onChange={this.props.handleChange}
            />
          <Button type='submit'>Edit</Button>
        </Form>
      </>
    );
  }
}
