import React, { Component } from "react";
import { Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MainDash from "./components/MainDash";


// import "./App.css";
// import Projects from './components/Projects';
// import Navbar from "./components/Navbar";
// import Tickets from "./components/Tickets";
// import AddTicket from "./components/AddTicket";
// import ProjectDetails from './components/ProjectDetails';
// import TaskDetails from './components/TaskDetails';

class App extends Component {
  state = {
    user: this.props.user,
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  render() {
    return (
      <>
        <Route exact path="/" component={Home} />
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
        <Route
          exact
          path="/dash"
          render={(props) => <MainDash user={this.user} test={'test'} setUser={this.setUser} {...props} />}
        />

        {/* <Navbar />

      <Route
        exact
        path='/tickets'
        component={Tickets}
      />

      <Route
        exact
        path='/tickets/create'
        component={AddTicket}
      /> */}
      </>
    );
  }
}

export default App;
