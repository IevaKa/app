import React, { Component } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import labs from "../../lab";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import RadioGroup from "@material-ui/core/RadioGroup";
import CssSyncRadioLabel from "./radiolabel";
import { withStyles } from "@material-ui/core/styles";
import x from "../../files/x.svg";
import { IronButton, ironBlue, ironRed } from "../../styles/global.js";

const fadeIn = keyframes`
 0% { opacity: 0 }
 70% { opacity: 0   }
 100% { opacity: 1 }
`;

const showLab = keyframes`
 0% { opacity: 0 }
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
  width: 370px;
  height: 460px;
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
  margin: ${(props) => (props.bottom ? "0 0 -15px 0" : "0px")};
`;

const WrapLab = styled.div`
  display: ${(props) => (props.showLab ? "block" : "none")};
  ${'' /* opacity: ${(props) => (props.showLab ? 1 : 0)};
  height: ${(props) => (props.showLab ? '' : '10px')}; */}
  animation: ${showLab} 0.4s ease-in-out;
  transition: all 500ms ease-in-out;

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
    width: "270px",
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
      borderBottomColor: ironRed,
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
    width: "270px",
    fontSize: 14,
    fontFamily: `'Poppins', sans-serif`,
    color: "red",
  },
})(FormControl);

export default class AddTicket extends Component {
  state = {
    lab: "",
    title: "",
    description: "",
    labs: [],
    category: "Lab",
    showLab: true,
  };

  handleShowLab = () => {
    if (this.state.category !== "Lab") {
      this.setState({
        showLab: false,
      });
    } else {
      this.setState({
        showLab: true,
      });
    }
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
      category: this.state.category,
      status: "Opened",
    };

    axios
      .post(`/api/tickets`, data)
      .then(() => {
        this.setState({
          lab: "",
          title: "",
          description: "",
          category: "Lab",
        });
        this.props.socket.emit("addTicket", {
          message: "this socket works --> ticketADD",
        });
        this.props.showTicketDetail(false);
        this.props.getAllfromDb();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleClick = () => {
    this.props.showTicketadd(false);
  };

  getLabs = () => {
    let d = new Date();
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    const labWeek = weekNo - this.props.user.cohortStartWeek + 1;
    return labWeek
  };

  componentDidMount = () => {
    const labWeek = this.getLabs();
    this.setState({
      labs: labs[labWeek],
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.category !== this.state.category) {
      this.handleShowLab();
    }
  };

  render() {
    if(!this.props.user) return <></>
    return (
      <MainContainer>
        <Container>
          <Close onClick={() => this.props.showTicketadd(false)}>
            <X src={x} alt="Close" />
          </Close>
          <FormContainer>
            <Form onSubmit={this.handleSubmit}>
              <RadioGroup row>
                <CssSyncRadioLabel
                  checked={this.state.value === 1}
                  handleChange={this.handleChange}
                  category={this.state.category}
                ></CssSyncRadioLabel>
              </RadioGroup>

              <WrapLab showLab={this.state.showLab}>
                <FormField>
                  <CssFormControl variant="outlined">
                    <CssInputLabel htmlFor="lab">Lab</CssInputLabel>
                    <Select
                      native
                      label="lab"
                      id="lab"
                      onChange={this.handleChange}
                      inputProps={{
                        name: "lab",
                        id: "lab",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {this.state.labs && this.state.labs.map((lab) => {
                        return <option key={lab} value={lab}>{lab}</option>;
                      })}
                    </Select>
                  </CssFormControl>
                </FormField>
              </WrapLab>

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
              <FormField bottom>
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
