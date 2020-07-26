import React, { Component } from "react";
import ProfileEdit from "../ProfileEdit";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Navbar from "../Navbar/index";
import styled, { keyframes } from "styled-components";

import x from "../../files/x.svg";

const fadeIn = keyframes`
 0% { opacity: 0 }
 70% { opacity: 0   }
 100% { opacity: 1 }
`;

const slideUp = keyframes`
 0% { transform: translateY(1000px); opacity: 0; }
 50% { opacity: 0.2; }
 100% { transform: translateY(0); opacity: 1; }
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  animation: ${fadeIn} 0.4s ease-in-out;
`;

const Container = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  animation: ${slideUp} 2s ease-in-out;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Close = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -25px;
  right: -25px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: white;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const X = styled.img`
  width: 40px;
`;

export default class index extends Component {
  state = {
    user: "",
    editForm: false,
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

  // Editing

  handleChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const id = this.props.match.params.id;
    axios
      .put(`/api/auth/loggedin/${id}`, {
        user: this.state.user,
      })
      .then((response) => {
        console.log(response.data.name);
        this.setState({
          user: response.data,
          editForm: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleEditForm = () => {
    this.setState({
      editForm: !this.state.editForm,
    });
  };

  render() {
    if (!this.state.user) return <></>;
    console.log(this.state.user);
    return (
      <MainContainer>
        <Container>
          {/* <Navbar /> */}
          <Close onClick={() => this.props.showProfile(false)}>
            {" "}
            <X src={x} alt="Close" />{" "}
          </Close>
          <FormContainer>
            {this.state.user.role === "Student" ? (
              <p>Hello Ironhacker</p>
            ) : (
              <p>Dear TA Welcome back</p>
            )}
            <div>
              <img src={this.state.user.image} alt="Pic" />
            </div>
            Username: {this.state.user.username}
            Name: {this.state.user.name}
            {this.state.user.location}
            {this.state.user.bio}
            {/* Editing */}
            <Button onClick={this.toggleEditForm}>Edit your name</Button>
            {this.state.editForm && (
              <ProfileEdit
                {...this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
              />
            )}
          </FormContainer>
        </Container>
      </MainContainer>
    );
  }
}
