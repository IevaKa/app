import React, { Component } from 'react';
import axios from 'axios';

// import { w3cwebsocket as W3CWebSocket } from 'websocket';
// import { Card, Avatar, Input, Typography } from 'antd';
// const client = new W3CWebSocket('ws://localhost:5555');
// const { Text } = Typography;
// const { Search } = Input;
// const { Meta } = Card;

export default class TicketDetail extends Component {

  state = {
    ticket: null
  }

  getTicket = () => {
    axios
      .get(`/api/tickets/${this.props.match.params.id}`)
      .then((response) => {
        console.log('the ticket ingo got: ', response.data)
        this.setState({
          ticket: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  assignTeacher = () => {
    axios.put(`/api/tickets/assignment/${this.props.match.params.id}`, {
    })
      .then(response => {
        // console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
    this.props.history.push("/dashboard");

  }

  componentDidMount = () => {
    this.getTicket()
  }


  render() {
    if (!this.state.ticket) return (<></>)
    return (
      <div>

        <h3>Created By: {this.state.ticket.createdBy.name}</h3>
        <h3>Lab: {this.state.ticket.lab}</h3>
        <h3>Title: {this.state.ticket.title}</h3>
        <h3>Problem: {this.state.ticket.description}</h3>
        <h3>Status: {this.state.ticket.status}</h3>
        <h3>Assignee: {this.state.ticket.assignee && this.state.ticket.assignee.name}</h3>
        <button onClick={this.assignTeacher}>Take this ticket</button>

      </div>
    )
  }
}
