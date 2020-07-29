import React, { Component } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import TicketEdit from "../TicketEdit";

import {
  IronButton,
  ironBlue,
  ironRed,
  ironYellow,
  lightYellow,
  lightRed,
  lightBlue,
  lightGray,
  evenLighterGray,
} from "../../styles/global.js";

// import { w3cwebsocket as W3CWebSocket } from "websocket";
// import { Card, Avatar, Input, Typography } from "antd";

import x from "../../files/x.svg";
import edit from "../../files/edit.svg";

// const client = new W3CWebSocket('ws://localhost:5555');
// const { Text } = Typography;
// const { Search } = Input;
// const { Meta } = Card;

// const fadeIn = keyframes`
//  0% { opacity: 0 }
//  70% { opacity: 0   }
//  100% { opacity: 1 }
// `;

// const slideUp = keyframes`
//  0% { transform: translateY(1000px); opacity: 0; }
//  50% { opacity: 0.2; }
//  100% { transform: translateY(0); opacity: 1; }
// `;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Container = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 10px;
  background-color: white;
  width: 350px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
`;

const FormContainer = styled.div`
  padding: 60px 30px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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

const Edit = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 5px;
  left: 5px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  cursor: pointer;
`;

const X = styled.img`
  width: 40px;
`;

const Y = styled.img`
  width: 30px;
`;
const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TicketTitle = styled.div`
  margin: 0 0 15px 0;
`;

const Title = styled.h1`
  font-size: 20px;
  margin: 0;
  margin: 0 0 10px 0;
`;

const LabTag = styled.div`
  font-size: 12px;
  color: ${ironBlue};
  display: inline-block;
  margin: 0;
`;

const OwnerTag = styled.div`
  font-size: 12px;
  color: ${ironBlue};
  display: block;
  margin: 0;
  color: ${lightGray};
`;

const OpenTag = styled.div`
  font-size: 12px;
  padding: 3px 8px 3px 8px;
  border-radius: 10px;
  color: ${ironBlue};
  background-color: ${lightBlue};
  display: inline-block;
  margin: 0 0 0 -10px;
`;

const ProgressTag = styled.div`
  font-size: 12px;
  padding: 3px 8px 3px 8px;
  border-radius: 10px;
  color: ${ironYellow};
  background-color: ${lightYellow};
  display: inline-block;
  margin: 0 0 0 -10px;
`;

const CancelledTag = styled.div`
  font-size: 12px;
  padding: 3px 8px 3px 8px;
  border-radius: 10px;
  color: ${ironRed};
  background-color: ${lightRed};
  display: inline-block;
  margin: 0 0 0 -10px;
`;

const TicketPic = styled.div``;

const TicketBody = styled.div``;

const TAtag = styled.div`
  font-size: 12px;
  padding: 3px 8px 3px 8px;
  border-radius: 10px;
  color: ${ironBlue};
  border: 1px solid ${ironBlue};
  ${"" /* background-color: ${lightBlue}; */}
  display: inline-block;
  margin: 0 0 0 5px;
`;

const NoOneTag = styled.div`
  font-size: 12px;
  padding: 3px 8px 3px 8px;
  border-radius: 10px;
  color: ${lightGray};
  border: 1px solid ${lightGray};
  ${"" /* background-color: ${evenLighterGray}; */}
  display: inline-block;
  margin: 0 0 0 5px;
`;

const TicketDescription = styled.div`
  width: 100%;
  font-size: 14px;
  border-radius: 10px;
  background-color: ${evenLighterGray};
  padding: 10px;
  margin: 0 0 15px 0;
  ${"" /* min-height: 100px; */}
`;

const UserPic = styled.img`
  width: 70px;
  border-radius: 100px;
`;

const WrapTicket = styled.div`
  opacity: ${(props) => (props.showEdit ? 1 : 1)};
  pointer-events: ${(props) => (props.showEdit ? "block" : "block")};
`;

const WrapTicketEdit = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  display: ${(props) => (props.showEdit ? "block" : "none")};

`;

export default class TicketDetail extends Component {
  state = {
    showEdit: false,
  };

  toggleEdit = () => {
    this.setState({
      showEdit: !this.state.showEdit,
    });
  };

  hideEdit = () => {
    this.setState({
      showEdit: false,
    });
  };

  assignTeacher = () => {
    axios
      .put(`/api/tickets/assignment/${this.props.ticketDetail._id}`, {
      })
      .then((response) => {
        console.log("heyyyy" + response);
      })
      .catch((err) => {
        console.log(err);
      });
      // this.props.history.push('/dashboard')
  };

  render() {
    // console.log(this.props.ticketDetail);
    // console.log(this.props.user);
    // console.log(this.props.ticketDetail._id)

    if (!this.props.ticketDetail) return <></>;
    return (
      <MainContainer>
        <Container>
          <WrapTicketEdit showEdit={this.state.showEdit}>
            <TicketEdit
              ticketDetail={this.props.ticketDetail}
              getAllfromDb={this.props.getAllfromDb}
              showTicketDetail={this.props.showTicketDetail}
              hideEdit={this.hideEdit}
            />
          </WrapTicketEdit>
          <Edit
            onClick={() => {
              this.toggleEdit();
            }}
          >
            <Y src={edit} alt="Edit" />
          </Edit>
          <Close
            onClick={() => {
              this.props.showTicketDetail(false)
              this.hideEdit();
            }}
          >
            <X src={x} alt="Close" />
          </Close>
          <FormContainer>
            <WrapTicket showEdit={this.state.showEdit}>
              {" "}
              <TicketHeader>
                <TicketTitle>
                  <Title>{this.props.ticketDetail.title}</Title>
                  <LabTag>{this.props.ticketDetail.lab}</LabTag>
                  <OwnerTag>
                    By {this.props.ticketDetail.createdBy.name}
                  </OwnerTag>
                </TicketTitle>
                <TicketPic>
                  <UserPic
                    src={this.props.ticketDetail.createdBy.image}
                    alt="User Pic"
                  />
                </TicketPic>
              </TicketHeader>
              <TicketBody>
                <TicketDescription>
                  {this.props.ticketDetail.description}
                </TicketDescription>

                {this.props.ticketDetail.status === "Opened" && (
                  <OpenTag>Open</OpenTag>
                )}
                {this.props.ticketDetail.status === "In progress" && (
                  <ProgressTag>In Progress</ProgressTag>
                )}
                {this.props.ticketDetail.status === "Cancelled" && (
                  <CancelledTag>Cancelled</CancelledTag>
                )}
                {this.props.ticketDetail.status !== "Cancelled" &&
                  (this.props.ticketDetail.assignee ? (
                    <TAtag>
                      <b>{this.props.ticketDetail.assignee.name}</b> is working
                      on it
                    </TAtag>
                  ) : (
                    <NoOneTag>No one is working on it yet</NoOneTag>
                  ))}
              </TicketBody>
              {this.props.user.role === "Teacher" && (
                <IronButton onClick={this.assignTeacher}>
                  Take this ticket
                </IronButton>
              )}
            </WrapTicket>
          </FormContainer>
        </Container>
      </MainContainer>
    );
  }
}
