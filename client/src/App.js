import React from "react";
import { Route, Switch as RouterSwitch } from "react-router-dom";
import ReactDOM from 'react-dom';
import { GlobalStyles } from "../src/styles/global.js";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home/";
import TicketBoard from "./components/TicketBoard";
import TicketAdd from "./components/TicketAdd";
import Dashboard from "./components/Dashboard";
import TicketDetail from "./components/TicketDetail";
// import TicketEdit from "./components/TicketEdit";
// import MainDash from "./components/MainDash";
import Profile from "./components/Profile";
import ProfileEdit from "./components/ProfileEdit";
import { Typography } from "@material-ui/core";


// import { w3cwebsocket as W3CWebSocket } from 'websocket';
// import { Card, Avatar, Input, Typography } from 'antd';
// const client = new W3CWebSocket('ws://localhost:5555');
// const { Text } = Typography;
// const { Search } = Input;
// const { Meta } = Card;

class App extends React.Component {
  state = {
    user: this.props.user,
    // messages: []
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  // Web Socket

  // onButtonClicked = (value) => {
  //   client.send(JSON.stringify({
  //     type: 'message',
  //     msg: value,
  //     user: this.state.user
  //   }));
  //   this.setState({ searchVal: ''})
  // }

  // componentDidMount() {
  //   client.onopen = () => {
  //     console.log('WebSocket Client Connected')
  //   };
  //   client.onmessage = (message) => {
  //     const dataFromServer = JSON.parse(message.data);
  //     console.log('got reply! ', dataFromServer);
  //     if (dataFromServer.type === 'message') {
  //       this.setState((state) => ({
  //         messages: [...state.messages,
  //         {
  //           msg: dataFromServer.msg,
  //           user: dataFromServer.user
  //         }]
  //       }))
  //     }
  //   };
  // }

  render() {
    // console.log('this is App.js', this.props.user)
    return (
      <>
        <GlobalStyles />
        {/* This is a Web Socket */}
        {/* <div>Testing the App
        <button onClick={() => this.onButtonClicked('Hello')}>Send Message</button>
        {this.state.messages.map(msg => <p>message: {msg.msg}, user:{msg.user}</p>)}
        </div> */}

        {/* <div className='title'>
          <Text type='secondary' style={{ fontSize: '36px' }}>Web Socket</Text>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 50 }}>
          {this.state.messages.map(message =>
            <Card key={message.msg} style={{ width: 300, margin: '16px 4px 0 4px' }} >
              <Meta
                // title={message.user}
                description={message.msg}
              />
            </Card>
          )}
        </div>

        <div className='bottom'>
          <Search
            placeholder='TA is aproaching you'
            enterButton='Send'
            value={this.state.searchVal}
            size='large'
            onChange={(e) => this.setState({ searchVal: e.target.value })}
            onSearch={value => this.onButtonClicked(value)}
          />
        </div> */}

        <RouterSwitch>
          <Route
            exact
            path="/dashboard"
            render={(props) => <Dashboard setUser={this.setUser} {...props} />}
          />

          <Route
            exact
            path="/"
            render={(props) => <Home setUser={this.setUser} {...props} />}
          />
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/ticket/board" component={TicketBoard} />

          {/* <Route exact path="/ticket/add" component={TicketAdd} /> */}
          <Route
            exact
            path="/ticket/add"
            render={(props) => <TicketAdd {...props} />}
          />
          <Route
            exact
            path="/ticket/:id"
            render={(props) => <TicketDetail {...props}  user={this.state.user} />}
          />

          {/* <Route exact path="/ticket/:id" component={TicketDetail} /> */}
          {/* <Route exact path="/ticket/:id/edit" component={TicketEdit} /> */}
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/profile/:id/edit" component={ProfileEdit} />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup setUser={this.setUser} {...props} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => <Login setUser={this.setUser} {...props} />}
          />
        </RouterSwitch>
      </>
    );
  }
}

export default App;
