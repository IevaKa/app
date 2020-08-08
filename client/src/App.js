import React from "react";
import { Route, Redirect, Switch as RouterSwitch } from "react-router-dom";
import { GlobalStyles } from "../src/styles/global.js";
import axios from "axios";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home/";
import Dashboard from "./components/Dashboard";

import socketIOClient from "socket.io-client";


class App extends React.Component {
  state = {
    user: this.props.user,
    socket: socketIOClient('https://irontickets.herokuapp.com/')
  };

  setUser = () => {
    axios.get("/api/auth/loggedin").then((response) => {
      const user = response.data;
      this.setState({
        user: user,
      });
    });
  };

  componentDidMount = () => {
    this.setUser();
  };

  render() {
    return (
      <>
        <GlobalStyles />
        <RouterSwitch>
          <Route
            exact
            path="/dashboard"
            render={(props) => {
              if(this.state.user) return <Dashboard socket={this.state.socket} setUser={this.setUser} user={this.state.user} {...props} />
              else return <Redirect to='/' /> 
            }} 
          />

          <Route
            exact
            path="/"
            render={(props) => <Home setUser={this.setUser} socket={this.state.socket} {...props} />}
          />
          
          <Route
            exact
            path="/signup"
            render={(props) => <Signup setUser={this.setUser} {...props} />
            }
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login setUser={this.setUser} {...props} />
            )}
          />
        </RouterSwitch>
      </>
    );
  }
}

export default App;
