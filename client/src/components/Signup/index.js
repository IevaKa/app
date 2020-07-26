import React, { Component } from "react";
import { signup } from "../../services/auth.js";
import CssSyncRadioLabel from "./radiolabel";

import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";

import { withStyles } from "@material-ui/core/styles";

import styled, { keyframes } from "styled-components";

import {
  IronButton,
  ironRed,
} from "../../styles/global.js";

import hexa from "../../files/b-hexa.svg";
import github from "../../files/w-github.svg";

const fadeIn = keyframes`
 0% { opacity: 0 }
 100% { opacity: 1 }
`;

const slideDown = keyframes`
 0% { transform: translateY(-1000px); opacity: 0; }
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
  width: 550px;
  height: 550px;
  z-index: 2;
  background-image: url(${hexa});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  animation: ${slideDown} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin: ${(props) => (props.bottom ? "0 0 8px 0" : "0px")};
`;

const TinyIcon = styled.img`
  margin: ${(props) => (props.form ? "16px 16px 0 -16px" : "-2px 3px 0 5px")};
  width: ${(props) => (props.form ? "20px" : "25px")};
`;

const Alert = styled.div`
  color: ${ironRed};
  padding: 10px 0 0 0;
  font-size: 11px;
`;

const Github = styled.div`
  padding: 24px 0 0 0;
  font-size: 14px;
  color: white;
`;

const GitLink = styled.a``;

const Strong = styled.span`
  font-weight: 600;
`;

const CssTextField = withStyles({
  root: {
    color: "white",
    width: "220px",
    "& .MuiInputLabel-root": {
      fontFamily: `'Poppins', sans-serif`,
      fontSize: "14px",
      color: "white",
    },
    "& .MuiInput-underline": {
      fontFamily: `'Poppins', sans-serif`,
      fontSize: "14px",
      color: "white",
      borderBottom: "red",
    },
    "& label.Mui-focused": {
      color: ironRed,
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "#fff8", // Semi-transparent underline
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "#fff", // Solid underline on hover
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#fff", // Solid underline on focus
    },
  },
})(TextField);

export default class Signup extends Component {
  state = {
    username: "",
    name: "",
    password: "",
    message: "",
    role: "Student",
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password, name, role } = this.state;

    signup(username, password, name, role).then((data) => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          password: "",
          name: "",
          role: "Student",
        });
      } else {
        this.props.setUser(data);
        this.props.history.push("/dashboard");
      }
    });
  };

  render() {
    return (
      <Overlay>
        <Container>
          <Form autoComplete="off" onSubmit={this.handleSubmit}>
            <RadioGroup row>
              <CssSyncRadioLabel
                handleChange={this.handleChange}
                role={this.state.role}
              ></CssSyncRadioLabel>
            </RadioGroup>
            <FormField>
              <CssTextField
                label="Full Name"
                id="name"
                variant="standard"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </FormField>
            <FormField>
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
            <FormField>
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

            <IronButton negative type="submit">
              Signup
            </IronButton>
          </Form>
          <GitLink href="http://localhost:5555/api/auth/github">
            <Github>
              Or signup with <TinyIcon src={github} /> <Strong>Github</Strong>
            </Github>
          </GitLink>
        </Container>
      </Overlay>
    );
  }
}
