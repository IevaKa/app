import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import styled, { keyframes } from "styled-components";

import { ironBlue, ironRed } from "../../styles/global.js";

const CssTextField = withStyles({
  root: {
    margin: "6px",
    width: "200px",
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

const IronButton = styled.button`
  text-transform: uppercase;
  cursor: pointer;
  background: black;
  font-size: 14px;
  border-radius: 50px;
  color: white;
  border: 1px solid black;
  margin: 0;
  padding: 5px;
  width: 60px;
  height: 40px;
  display: inline-block;
  transition: 0.2s all ease-out;

  &:hover {
    color: black;
    background-color: transparent;
    border: 2px solid black;
  }

  &:focus {
    outline: none;
  }
`;

const FormBody = styled.div`
display: flex;
justify-content: center;
align-items: center;
`


export default class index extends Component {
  render() {
    return (
      <>
      <Form onSubmit={this.props.handleSubmit}>
        <FormBody>
          <CssTextField
            id="name"
            variant="outlined"
            type="text"
            name="name"
            value={this.props.name}
            onChange={this.props.handleChange}
            size="small"
          />
          <IronButton type="submit">Edit</IronButton>
        </FormBody>
      </Form>
      {/* <Form onSubmit={this.props.handleSubmit}>
        <FormBody>
          <CssTextField
            id="currentCohortWeek"
            variant="outlined"
            type="text"
            name="currentCohortWeek"
            value={this.props.currentCohortWeek}
            onChange={this.props.handleChange}
            size="small"
          />
          <IronButton type="submit">Edit</IronButton>
        </FormBody>
      </Form> */}
      </>
    );
  }
}
