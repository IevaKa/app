import React, { Component } from "react";
import { signup } from "../../services/auth.js";

import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { withStyles, makeStyles } from "@material-ui/core/styles";

import styled, { keyframes } from "styled-components";

import { IronButton, ironBlue, ironRed } from "../../styles/global.js";

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
  width: 500px;
  height: 500px;
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
  padding: 24px 0 0 0;
  font-size: 14px;
`;

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
    "& label.Mui-focused": {
      color: ironBlue,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: ironBlue,
    },
  },
})(TextField);

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
});

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
        this.props.history.push("/ticket/board");
      }
    });
  };

  render() {
    return (
      <Overlay>
        <Container>
          <Form autoComplete="off" onSubmit={this.handleSubmit}>
            <RadioGroup row>
              <FormControlLabel
                className={useStyles}
                checked={this.state.role === "Student"}
                onChange={this.handleChange}
                type="radio"
                value="Student"
                name="role"
                inputProps={{ "aria-label": "A" }}
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                className={useStyles}
                checked={this.state.role === "Teacher"}
                onChange={this.handleChange}
                type="radio"
                value="Teacher"
                name="role"
                inputProps={{ "aria-label": "A" }}
                control={<Radio />}
                label="Teacher"
              />
            </RadioGroup>

            <CssTextField
              label="Full Name"
              id="name"
              variant="standard"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />

            <CssTextField
              label="Username"
              id="username"
              variant="standard"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />

            <CssTextField
              label="Password"
              id="password"
              variant="standard"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />

            {this.state.message && (
              <Alert variant="danger">{this.state.message}</Alert>
            )}
            <IronButton type="submit">Signup</IronButton>
          </Form>
        </Container>
      </Overlay>
    );
  }
}
