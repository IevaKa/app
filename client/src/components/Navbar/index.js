import React from "react";
import { Link } from "react-router-dom";
import { Navbar as Nav } from "react-bootstrap";
import { logout } from "../../services/auth.js";
import axios from "axios";

import styled, { keyframes } from "styled-components";


export default class Navbar extends React.Component {
  state = {
    user: null,
  };

  getUser = () => {
    axios.get("/api/auth/loggedin").then((response) => {
      const user = response.data;
      this.setState({
        user: user,
      });
    });
  };

  componentDidMount = () => {
    this.getUser();
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  handleLogout = () => {
    logout().then(() => {
      this.setUser(null);
    });
  };

  render() {
    // console.log('this is navbar ', this.state.user)
    if (!this.state.user) return <></>;
    return (
      <Nav className="navbar ">
        <>
          {this.state.user.role === "Student" ? (
              <Link to="/ticket/add">Add Ticket</Link>
          ) : (
              <Link to="/ticket/board">Dashboard</Link>
          )}

            <Link to={`/profile/${this.state.user._id}`}>Profile</Link>
            <Link to="/" onClick={() => this.handleLogout(this.props)}>
              Logout
            </Link>
        </>
      </Nav>
    );
  }
}
