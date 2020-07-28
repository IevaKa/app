import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';



export default class TicketEdit extends Component {

  state = {
    title: '',
    description: '',
    editForm: false,
  }

  getData = () => {
    const id = this.props.ticketDetail._id;
    axios
      .get(`/api/projects/edit/${id}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          title: response.data.title,
          description: response.data.description
        });
      })
      .catch(err => {
        console.log(err.response);
        if (err.response.status === 404) {
          this.setState({ error: "Not found" });
        }
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const id = this.props.ticketDetail._id;
    axios.put(`/api/tickets/edit/${id}`, {
      title: this.state.title,
      description: this.state.description,
    })
      .then(response => {
        this.setState({
          title: response.data.title,
          description: response.data.description,

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

  componentDidMount = () => {
    this.getData();
  };

  render() {
    // console.log("THIS CONSOLE LOG", this.props.ticketDetail)
    return (
      <div>
        <Button onClick={this.toggleEditForm}>Show Edit Form</Button>
        {this.state.editForm && (
          <>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Title:</Form.Label>
                <Form.Control
                  type='text'
                  name='title'
                  value={this.state.title}
                  onChange={this.handleChange}
                />
                <Form.Label>Problem:</Form.Label>
                <Form.Control
                  type='text'
                  name='description'
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button type='submit'>Edit</Button>
            </Form>
          </>
        )}

      </div>
    )
  }
}
