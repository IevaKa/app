import React, { Component } from 'react';
import Navbar from '../Navbar';
// import AddTicket from './AddTicket';
import axios from 'axios';

export default class Tickets extends Component {
  state = {
    data: []
  }

  getData = () => {
    axios.get('/api/tickets').then(response => {
      this.setState({
        data: response.data
      })
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount = () => {
    this.getData()
  }

  render() {
    console.log(this.state.data)
    return (
      <>
      <Navbar/>
      <h1>These are the Open Tickets</h1>
      <ul>
      {this.state.data.map(ticket => {
        return(
        <li key={ticket._id}>{ticket.title}</li>
        )
      })}
      </ul>
      <h1>These are in Progress Tickets</h1>
      <ul>
      {this.state.data.map(ticket => {
        return(
        <li key={ticket._id}>{ticket.title}</li>
        )
      })}
      </ul>
      <h1>These are Solved Tickets</h1>
      <ul>
      {this.state.data.map(ticket => {
        return(
        <li key={ticket._id}>{ticket.title}</li>
        )
      })}
      </ul>
      </>
    );
  }
}