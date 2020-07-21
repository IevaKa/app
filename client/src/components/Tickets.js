import React, { Component } from 'react';
// import ProjectList from './ProjectList';
// import AddTicket from './AddTicket';
import axios from 'axios';

export default class Tickets extends Component {
  state = {
    tickets: []
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    axios
      .get('/api/tickets')
      .then(response => {
        this.setState({
          tickets: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log(this.state.tickets);
    return (
      <div className='container'>
        {/* <AddTicket getData={this.getData} /> */}
        {/* <ProjectList projects={this.state.projects} /> */}
      </div>
    );
  }
}