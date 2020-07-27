import React, { Component } from 'react';
import axios from 'axios'

export default class TicketDetail extends Component {

  state = {
    ticket: null
  }

  getTicket = () => {
    axios
      .get(`/api/tickets/${this.props.match.params.id}`)
      .then((response) => {
        console.log(response)
        this.setState({
          ticket: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  assignTeacher = () => {
    axios.put(`/api/tickets/${this.props.match.params.id}`, {
      status: 'In progress'
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount = () => {
    this.getTicket()
  }

  render() {
    if (!this.state.ticket) return (<></>)
    // console.log(this.state.ticket.createdBy.name)
    return (
      <div>
        <h3>Created By: {this.state.ticket.createdBy.name}</h3>
        <h3>{this.state.ticket.lab}</h3>
        <h3>{this.state.ticket.title}</h3>
        <h3>{this.state.ticket.description}</h3>
        <h3>{this.state.ticket.status}</h3>
        <button onClick={this.assignTeacher}>This is a button</button>
      </div>
    )
  }
}
