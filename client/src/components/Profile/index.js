import React, { Component } from "react";
import ProfileEdit from "../ProfileEdit";
import axios from "axios";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { logout } from "../../services/auth.js";

import {
  Button,
} from "../../styles/global.js";

import x from "../../files/x.svg";
import profile from "../../files/b-user.svg";
import pencil from "../../files/pencil.svg";

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
  width: 350px;
  height: 450px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  animation: ${slideUp} 2s ease-in-out;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
`;

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Close = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 5px;
  right: 5px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  cursor: pointer;
`;

const X = styled.img`
  width: 40px;
`;

const Icon = styled.img`
  width: 15px;
  margin: 0 0 0 10px;
`;

const UserPic = styled.img`
  width: ${(props) => (props.imghover ? "65px" : "120px")};
  border-radius: 100px;
  transition: all 300ms ease-in-out;
`;

const Name = styled.h1`
  font-size: 24px;
`;

export default class index extends Component {
  state = {
    // user: "",
    editForm: false,
  };

  // getUser = () => {
  //   axios.get("/api/auth/loggedin").then((response) => {
  //     const user = response.data;
  //     this.setState({
  //       user: user,
  //     });
  //   });
  // };

  // componentDidMount = () => {
  //   this.getUser();
  // };

  // Editing

  handleChange = (event) => {
    // console.log(event.target);
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
        user: this.props.user,
      })
      .then((response) => {
        // console.log(response.data.name);
        this.setState({
          editForm: false,
        })
        this.props.setUser(response.data)
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

  handleLogout = () => {
    logout().then(() => {
      this.props.setUser(null);
    });
  };

  render() {

    // console.log(this.props.user)
    if (!this.props.user) return <></>;
    return (
      <MainContainer>
        <Container>
          <Close onClick={() => this.props.showProfile(false)}>
            <X src={x} alt="Close" />
          </Close>
          <FormContainer>
            <FormWrap>
              {this.props.user.image ? (
                <UserPic src={this.props.user.image} alt="User Pic" />
              ) : (
                <UserPic src={profile} alt="User Pic" />
              )}
              {this.state.editForm ? (
                <ProfileEdit
                  {...this.state}
                  user={this.props.user}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                />
              ) : (
                <Name>
                  {this.props.user.name}
                  <Icon src={pencil} alt="Edit" onClick={this.toggleEditForm} />
                </Name>
              )}
              @{this.props.user.username}
              {this.props.user.location}
              {this.props.user.bio}
            </FormWrap>
            <FormWrap>
              <Link to="/" onClick={this.handleLogout}>
                <Button>Logout</Button>
              </Link>
            </FormWrap>
          </FormContainer>
        </Container>
      </MainContainer>
    );
  }
}
