import React, { Component } from 'react';
import axios from 'axios';

import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Card, Avatar, Input, Typography } from 'antd';
const client = new W3CWebSocket('ws://localhost:5555');
const { Text } = Typography;
const { Search } = Input;
const { Meta } = Card;

export default class TicketDetail extends Component {

  state = {
    ticket: null,
    messages: [],
    user: this.props.user.name
  }



  getTicket = () => {
    axios
      .get(`/api/tickets/${this.props.match.params.id}`)
      .then((response) => {
        // console.log(response)
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
        // console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // componentDidMount = () => {
  // this.getTicket()
  // }

  componentDidMount() {
    this.getTicket()
    console.log('What about here?')
    // const client = new W3CWebSocket(`ws://localhost:5555/api/tickets/${this.props.match.params.id}`);
    client.onopen = () => {
      console.log('WebSocket Client Connected')
    };
    client.onmessage = (message) => {
      console.log('Now I am here')
      const dataFromServer = JSON.parse(message.data);
      console.log(message.data);
      console.log(message);
      console.log('got reply! ', dataFromServer);
      if (dataFromServer.type === 'message') {
        this.setState((state) => ({
          messages: [...state.messages,
          {
            msg: dataFromServer.msg,
            user: this.state.user
          }]
        }))
        console.log('I am Here', this.state.messages);
      }
    };
  }

  onButtonClicked = (value) => {
    // const client = new W3CWebSocket(`ws://localhost:5555/api/tickets/${this.props.match.params.id}`);
    console.log(value)
    client.send(JSON.stringify({
      type: 'message',
      msg: value,
      // user: this.state.user
    }));
    this.setState({ searchVal: '' })
  }

  render() {
    // console.log(this.props.user.name)
    if (!this.state.ticket) return (<></>)
    // console.log(this.state.ticket.createdBy.name)
    console.log("Messages", this.state.messages);
    return (
      <div>
        <h3>Created By: {this.state.ticket.createdBy.name}</h3>
        <h3>{this.state.ticket.lab}</h3>
        <h3>{this.state.ticket.title}</h3>
        <h3>{this.state.ticket.description}</h3>
        <h3>{this.state.ticket.status}</h3>
        <button onClick={this.assignTeacher}>This is a button</button>

        <div className='title'>
          <Text type='secondary' style={{ fontSize: '36px' }}>Ticket Chat</Text>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 50 }}>
          {this.state.messages.map(message =>

            <Card key={message.msg} style={{ width: 300, margin: '16px 4px 0 4px' }} >
              <Meta
                title={message.user}
                description={message.msg}
              />
            </Card>
          )}
        </div>

        <div className='bottom'>
          <Search
            placeholder='Say Something'
            enterButton='Send'
            value={this.state.searchVal}
            size='large'
            onChange={(e) => this.setState({ searchVal: e.target.value })}
            onSearch={value => this.onButtonClicked(value)}
          />
        </div>

      </div>
    )
  }
}
