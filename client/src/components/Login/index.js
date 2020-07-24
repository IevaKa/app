import React from "react";
import { login } from "../../services/auth";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import styled, { keyframes } from "styled-components";

import {
  IronButton,
  ironBlue,
  ironRed,
  StyledLink,
  lightGray,
  darkGray,
  ironPurple
} from "../../styles/global.js";

import hexa from "../../files/b-hexa.svg";
import user from "../../files/user.svg";
import key from "../../files/key.svg";
import github from "../../files/w-github.svg";

const fadeIn = keyframes`
 0% { opacity: 0 }
 100% { opacity: 1 }
`;

const slideUp = keyframes`
 0% { transform: translateY(1000px); opacity: 0; }
 50% { opacity: 0.2; }
 100% { transform: translateY(0); opacity: 1; }
`;

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.8);
  animation: ${fadeIn} 0.2s 1 cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

const Container = styled.div`
  position: absolute;
  top: calc(50vw - width);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 470px;
  height: 470px;
  z-index: 2;
  background-image: url(${hexa});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  animation: ${slideUp} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

const FormField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  margin: ${(props) => (props.bottom ? "0 0 10px 0" : "0px")};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TinyIcon = styled.img`
  margin: ${(props) => (props.form ? "16px 16px 0 -16px" : "-2px 3px 0 5px")};
  width: ${(props) => (props.form ? "20px" : "25px")};
`;

const Alert = styled.div`
  color: ${ironRed};
  padding: 8px;
  font-size: 11px;
`;

const Github = styled.div`
  color: white;
  padding: 24px 0 0 0;
  font-size: 14px;
`;

const GitLink = styled.a`
`;

const Strong = styled.span`
  font-weight: 600;
`;

// MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl
// MuiInputBase-input MuiInput-input

const CssTextField = withStyles({
  root: {
    color: 'white',
    width: "220px",
    "& .MuiInputLabel-root": {
      fontFamily: `'Poppins', sans-serif`,
      fontSize: "14px",
      color: 'white',
    },
    "& .MuiInput-underline": {
      fontFamily: `'Poppins', sans-serif`,
      fontSize: "14px",
      color: ironPurple,
      borderBottom: 'red'
    },
    "& label.Mui-focused": {
      color: ironPurple,
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#fff8', // Semi-transparent underline
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: '#fff', // Solid underline on hover
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#fff', // Solid underline on focus
    },
  },
  
  
})(TextField);

export default class Login extends React.Component {
  state = {
    username: "",
    password: "",
    message: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    login(username, password).then((data) => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          password: "",
        });
      } else {
        // successfully logged in
        // update the state for the parent component
        this.props.setUser(data);
        this.props.history.push("/ticket/board");
      }
    });
  };

  render() {
    // console.log(this.props.setUser)

    return (
      <Overlay>
        <Container>
          <Form autoComplete="off" onSubmit={this.handleSubmit}>
            <FormField>
              <TinyIcon form src={user} />
              <CssTextField
                label="Username"
                id="username"
                variant="standard"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </FormField>
            <FormField bottom>
              <TinyIcon form src={key} />
              <CssTextField
                label="Password"
                id="password"
                variant="standard"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormField>
            {this.state.message && <Alert>{this.state.message}</Alert>}
            <IronButton negative type="submit">Login</IronButton>
          </Form>
            <GitLink to="http://localhost:5555/api/auth/github">
              <Github>
                Or login with <TinyIcon src={github} /> <Strong>Github</Strong>
              </Github>
            </GitLink>
        </Container>
      </Overlay>
    );
  }
}
