import React, { Component } from 'react';
// import ProjectList from './ProjectList';
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
  // state = {
  //   tickets: []
  // };

  // componentDidMount = () => {
  //   this.getData();
  // };

  // getData = () => {
  //   axios
  //     .get('/api/tickets')
  //     .then(response => {
  //       this.setState({
  //         tickets: response.data
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
  render() {
    console.log(this.state.data)
    return (
      <ul>
      {this.state.data.map(ticket => {
        return(
        <li key={ticket._id}>{ticket.title}</li>
        )
      })}
      </ul>
    );
  }
}