import React, { Component } from "react";
import ProfileEdit from "../ProfileEdit";
import CohortStartEdit from "../CohortStartEdit";
import axios from "axios";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { logout } from "../../services/auth.js";

import {
  Button,
  lightGray
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
  padding: 20px;
  display: inline-block;
  border-radius: 10px;
  background-color: white;
  width: 350px;
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
cursor: pointer;
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
  margin: 8px 0 0 0;
`;
const Location = styled.h2`
  font-size: 14px;
  color: ${lightGray};
  margin: 10px;
`;

export default class index extends Component {
  state = {
    user: "",
    editForm: false,
    editCohortStart: false,
    name: "",
    cohortStartWeek: null
  };

  getUser = () => {
    axios.get('/api/auth/loggedin')
      .then(response => {
        const user = response.data;
        this.setState({
          user: user,
          name: user.name,
          cohortStartWeek: user.cohortStartWeek
        });
      })
  } 

  componentDidMount = () => {
    this.getUser();
  };

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };


  handleSubmit = event => {
    event.preventDefault();
    const id = this.state.user._id;
    axios.put(`/api/auth/loggedin/${id}`, {
      name: this.state.name,
    })
      .then(response => {
        this.setState({
          user: response.data,
          editForm: false,
          name: response.data.name
       })
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleCohortStartSubmit = event => {
    event.preventDefault();
    axios.put('/api/user', {
      startWeek: this.state.cohortStartWeek
    })
      .then(response => {
        this.setState({
          editCohortStart: false
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  toggleEditForm = () => {
    this.setState({
      editForm: !this.state.editForm,
    });
  };

  toggleCohortStartForm = () => {
    this.setState({
      editCohortStart: !this.state.editCohortStart,
    });
  };

  handleLogout = () => {
    logout().then(() => {
      this.props.setUser(null);
    });
  };


  render() {
    if (!this.state.user) return <></>;
    return (
      <MainContainer>
        <Container>
          <Close onClick={() => this.props.showProfile(false)}>
            <X src={x} alt="Close" />
          </Close>
          <FormContainer>
            <FormWrap>
              {this.state.user.image ? (
                <UserPic src={this.state.user.image} alt="User Pic" />
              ) : (
                <UserPic src={profile} alt="User Pic" />
              )}
              {this.state.editForm ? (
                <ProfileEdit
                  {...this.state}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  getUser={this.getUser}
                />
              ) : (
                <Name>
                  {this.state.user.name}
                  <Icon src={pencil} alt="Edit" onClick={this.toggleEditForm} />
                </Name>
              )}
              @{this.state.user.username}
             <Location>{this.state.user.location}</Location> 
              {this.state.user.bio}
            </FormWrap>

            <FormWrap>
              {this.state.editCohortStart && this.state.user.role === 'Teacher' ? (
                <CohortStartEdit
                  {...this.state}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleCohortStartSubmit}
                />
              ) : 
                  <Location> 
                    Cohort Start Week: {this.state.cohortStartWeek}
                      <Icon src={pencil} alt="Edit" onClick={this.toggleCohortStartForm} />
                  </Location>
              }
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