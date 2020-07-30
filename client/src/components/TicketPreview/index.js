import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

import {
  ironBlue,
  ironRed,
  lightBlue,
  lightGray,
} from "../../styles/global.js";

import Moment from "react-moment";

import profile from "../../files/b-user.svg";
import bug from "../../files/bug.svg";
import question from "../../files/question.svg";
import lab from "../../files/lab.svg";

const Container = styled.div`
  font-size: 14px;
  border: ${(props) =>
    props.hover ? `1px solid ${ironBlue}` : `1px solid ${lightGray}`};
  width: ${(props) => (props.hover ? "220px" : "210px")};
  padding: 12px 10px 18px 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.05);
  color: ${(props) => (props.isDragging ? "white" : "black")};
  background-color: ${(props) => (props.isDragging ? ironBlue : "white")};
  transition: all 300ms ease-in-out;
  ${"" /* background-color: red */}
`;

const LabTag = styled.div`
  font-size: 11px;
  padding: 3px 8px 3px 8px;
  border-radius: 10px;
  color: ${ironBlue};
  background-color: ${(props) => (props.isDragging ? "white" : lightBlue)};
  display: inline-block;
  margin: 0 0 10px 0;
`;

const EmptyLabTag = styled.div`
  display: inline-block;
  margin: 0 0 10px 0;
`;


const Timestamp = styled.div`
  font-size: 11px;
  color: ${(props) => (props.isDragging ? "white" : lightGray)};
  display: inline-block;
  margin: 8px 0 0 5px;
`;

const TicketOwner = styled.img`
  border-radius: 100%;
  width: 20px;
  height: 20px;
  display: inline-block;
`;

const WrapTAstatus = styled.div`
  position: relative;
`;

const TAstatus = styled.div`
  color: white;
  text-align: right;
  position: absolute;
  font-size: 11px;
  margin: 10px 0 0 0;
  right: 0;
  padding: 2px 5px 2px 5px;
  border-radius: 100px;
  background-color: ${ironRed};
`;

const Category = styled.img`
  width: 15px;
  margin: 0 6px 0 0;
`;

const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
`;

const Icon = styled.div`
  padding: 0;
  margin: 0;
`;

const TicketTitle = styled.div`
margin: 7px 0 7px 0;
${'' /* background-color: red; */}
`;

export default class TicketPreview extends React.Component {
  state = {
    hover: false,
  };

  render() {
    const hovering = (event) => {
      this.setState({
        hover: true,
      });
    };

    const notHovering = (event) => {
      this.setState({
        hover: false,
      });
    };

    const timestamp = this.props.ticket.createdAt;

    // console.log(this.props.ticket);
    // console.log(this.props.allUsers);

    let checkUser = (user) => user._id === this.props.ticket.createdBy;
    const ticketOwner = this.props.allUsers.find(checkUser);

    let checkTA = (user) => user._id === this.props.ticket.assignee;
    const ticketTA = this.props.allUsers.find(checkTA);

    const handleClick = (id) => {
      this.props.getTicketDetails(id);
      this.props.showTicketDetail(true);
    };

    // console.log("OWNER IS" + ticketOwner);
    // console.log(this.props.ticket);
    return (
      <Draggable draggableId={this.props.ticket._id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            onClick={() => handleClick(this.props.ticket._id)}
            onMouseOver={hovering}
            onMouseOut={notHovering}
            hover={this.state.hover}
          >
            <TicketHeader>
              {this.props.ticket.lab ? (
                <LabTag isDragging={snapshot.isDragging}>
                  {this.props.ticket.lab}
                </LabTag>
              ) : (
                <EmptyLabTag isDragging={snapshot.isDragging}>
                  
                </EmptyLabTag>
              )}

              <Icon>
                {this.props.ticket.category === "Error" && (
                  <Category src={bug} slt="Bug" />
                )}
                {this.props.ticket.category === "Question" && (
                  <Category src={question} slt="Question Mark" />
                )}
                {this.props.ticket.category === "Lab" && (
                  <Category src={lab} slt="Lab" />
                )}
              </Icon>
            </TicketHeader>

            <TicketTitle>{this.props.ticket.title}</TicketTitle>
            
            {ticketOwner &&
              (ticketOwner.image ? (
                <TicketOwner src={ticketOwner.image} />
              ) : (
                <TicketOwner src={profile} />
              ))}
            <Timestamp isDragging={snapshot.isDragging}>
              Created <Moment fromNow>{timestamp}</Moment>
            </Timestamp>
            <WrapTAstatus>
              {this.props.ticket.status !== "Solved" &&
                ticketTA &&
                this.props.user.role === "Student" && (
                  <TAstatus>{ticketTA.name} is on it!</TAstatus>
                )}
            </WrapTAstatus>
          </Container>
        )}
      </Draggable>
    );
  }
}
