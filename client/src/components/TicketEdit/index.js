import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { IronButton, ironBlue, ironRed } from "../../styles/global.js";

const FormContainer = styled.div`
  padding: 60px 30px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 10px;
  background-color: white;
`;

const FormField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  margin: ${(props) => (props.bottom ? "0 0 8px 0" : "0px")};
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

export default class TicketEdit extends Component {
  state = {
    title: this.props.ticketDetail.title,
    description: this.props.ticketDetail.description,
    editForm: true,
  };

  getData = () => {
    const id = this.props.ticketDetail._id;
    axios
      .get(`/api/projects/edit/${id}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          title: response.data.title,
          description: response.data.description,
        });
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 404) {
          this.setState({ error: "Not found" });
        }
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const id = this.props.ticketDetail._id;
    axios
      .put(`/api/tickets/edit/${id}`, {
        title: this.state.title,
        description: this.state.description,
      })
      .then((response) => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
        });
        this.props.getAllfromDb();
        this.props.showTicketDetail(false);
        this.props.hideEdit();
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

  componentDidMount = () => {
    this.getData();
  };

  render() {
    // console.log("THIS CONSOLE LOG", this.props.ticketDetail)
    return (
      <FormContainer>
        {/* <Button onClick={this.toggleEditForm}>Show Edit Form</Button> */}
        {this.state.editForm && (
          <>
            <Form onSubmit={this.handleSubmit}>
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

              <IronButton type="submit">
                Edit Ticket
              </IronButton>
            </Form>
          </>
        )}
      </FormContainer>
    );
  }
}

{
  /* <Form onSubmit={this.handleSubmit}>
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
</Form> */
}
