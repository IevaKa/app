import React from "react";
import { login } from "../../services/auth";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import styled, { keyframes } from "styled-components";

import {
  IronButton,
  ironBlue,
  ironRed,
  ironPurple,
  lightGray,
  StyledLink,
} from "../../styles/global.js";

import hexa from "../../files/w-hexa.svg";
import user from "../../files/user.svg";
import key from "../../files/key.svg";
import github from "../../files/github.svg";

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
  padding: 3px;
  margin: ${(props) => (props.bottom ? "0 0 8px 0" : "0px")};
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
  font-size: 11px;
  padding: 10px 0 0 0;
`;

const Github = styled.div`
  color: ${lightGray};
  padding: 24px 0 0 0;
  font-size: 14px;
`;

const GitLink = styled.a``;

const Strong = styled.span`
  font-weight: 600;
`;

const CssTextField = withStyles({
  root: {
    margin: "6px",
    width: "220px",
    "& .MuiInputLabel-root": {
      fontFamily: `'Poppins', sans-serif`,
      fontSize: "14px",
    },
    "& .MuiInput-underline": {
      fontFamily: `'Poppins', sans-serif`,
      fontSize: "14px",
      color: ironBlue,
    },
    "& label.Mui-focused": {
      color: ironBlue,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: ironBlue,
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: ironRed, // Solid underline on hover
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
        this.props.history.push("/dashboard");
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
              <TinyIcon form src={user} alt="User Icon"/>
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
              <TinyIcon form src={key} alt="Key Icon"/>
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
            <IronButton type="submit">Login</IronButton>
          </Form>
          <StyledLink>
            <GitLink href="http://localhost:5555/api/auth/github">
              <Github>
                Or login with <TinyIcon src={github} alt="GitHub Icon"/> <Strong>Github</Strong>
              </Github>
            </GitLink>
          </StyledLink>
        </Container>
      </Overlay>
    );
  }
}
