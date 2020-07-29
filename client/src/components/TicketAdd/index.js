import React, { Component } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";

import { withStyles } from "@material-ui/core/styles";

import x from "../../files/x.svg";

import { IronButton, ironBlue, ironRed } from "../../styles/global.js";

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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 450px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  animation: ${slideUp} 2s ease-in-out;
`;

const FormContainer = styled.div`
  padding: 45px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

// const Close = styled.div`
//   position: absolute;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   top: -25px;
//   right: -25px;
//   width: 50px;
//   height: 50px;
//   border-radius: 100%;
//   background-color: white;
//   box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
//   cursor: pointer;
// `;

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

const CssTextField = withStyles({
  root: {
    margin: "6px",
    width: "250px",
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

const CssInputLabel = withStyles({
  root: {
    fontSize: 14,
    fontFamily: `'Poppins', sans-serif`,
  },
})(InputLabel);

const CssFormControl = withStyles({
  root: {
    width: "250px",
    fontSize: 14,
    fontFamily: `'Poppins', sans-serif`,
    color: "red",
  },
})(FormControl);

export default class AddTicket extends Component {
  state = {
    lab: "React | Ironbeers",
    title: "",
    description: "",
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      lab: this.state.lab,
      title: this.state.title,
      description: this.state.description,
      status: "Opened",
    }

    axios
      .post(`/api/tickets`, data)
      .then(() => {
        // console.log("here", this.props.history);
        this.setState({
          lab: "React | Ironbeers",
          title: "",
          description: "",
        });
        this.props.socket.emit('addTicket', {
          message: 'this socket works --> ticketADD'
        })
        this.props.showTicketDetail(false);
        // this.props.setTickets([...this.props.tickets, data] )
        this.props.getAllfromDb()
        // this.props.history.push("/dashboard");
        // this.props.socket.emit('addTicket')
      })
      .catch((err) => {
        console.log(err);
      });


  };

  handleClick = () => {
    this.props.showTicketadd(false);
  };

  render() {
    return (
      <MainContainer>
        <Container>
          {/* <Navbar /> */}
          <Close onClick={() => this.props.showTicketadd(false)}>
            <X src={x} alt="Close" />
          </Close>
          <FormContainer>
            <Form onSubmit={this.handleSubmit}>
              <FormField>
                <CssFormControl variant="outlined">
                  <CssInputLabel htmlFor="lab">Lab</CssInputLabel>
                  <Select
                    native
                    label="lab"
                    id="lab"
                    value={this.state.age}
                    onChange={this.handleChange}
                    inputProps={{
                      name: "lab",
                      id: "lab",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value="React | Ironbeers">React | Ironbeers</option>
                    <option value="React | Wiki Countries">
                      React | Wiki Countries
                    </option>
                    <option value="React | IronBook">React | IronBook</option>
                  </Select>
                </CssFormControl>
              </FormField>

              <FormField>
                <CssTextField
                  label="Title"
                  id="title"
                  variant="outlined"
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </FormField>
              <FormField>
                <CssTextField
                  label="Description"
                  id="description"
                  variant="outlined"
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  multiline
                  rows={4}
                />
              </FormField>

              <IronButton type="submit" onClick={this.handleClick}>
                Create Ticket
              </IronButton>
            </Form>
          </FormContainer>
        </Container>
      </MainContainer>
    );
  }
}
