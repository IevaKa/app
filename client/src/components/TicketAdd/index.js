import React, { Component } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import styled, { keyframes } from "styled-components";

import x from "../../files/x.svg";


import {
  IronButton,
  ironBlue,
  ironRed,
  ironPurple,
  lightBlue,
  lightGray,
  StyledLink,
} from "../../styles/global.js";

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
  width: 350px;
  height: 400px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  animation: ${slideUp} 2s ease-in-out;
`;

const FormContainer = styled.div`
  display: flex;
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
    axios
      .post(`/api/tickets`, {
        lab: this.state.lab,
        title: this.state.title,
        description: this.state.description,
        status: "Opened",
      })
      .then(() => {
        console.log("here", this.props.history);
        this.setState({
          lab: "",
          title: "",
          description: "",
        });
        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <MainContainer>
        <Container>
          {/* <Navbar /> */}
          <Close onClick={() => this.props.showTicketadd(false)}><X src={x} alt="Close"/></Close>
          <FormContainer>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="Lab">Lab</label>
                <select
                  className="form-control"
                  id="lab"
                  name="lab"
                  onChange={this.handleChange}
                >
                  <option value="React | Ironbeers">React | Ironbeers</option>
                  <option value="React | Wiki Countries">
                    React | Wiki Countries
                  </option>
                  <option value="React | IronBook">React | IronBook</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  aria-describedby="title"
                  onChange={this.handleChange}
                  value={this.state.title}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  aria-describedby="description"
                  onChange={this.handleChange}
                  value={this.state.description}
                />
              </div>
              <button
                type="submit"
                onClick={() => this.props.showTicketadd(false)}
              >
                Submit
              </button>
            </form>
          </FormContainer>
        </Container>
      </MainContainer>
    );
  }
}
