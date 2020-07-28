import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import { ironBlue, lightBlue, lightGray } from "../../styles/global.js";

import Moment from "react-moment";

import profile from "../../files/b-user.svg";

const Container = styled.div`
  font-size: 14px;
  border: 1px solid ${lightGray};
  width: 210px;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 5px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.05);
  color: ${(props) => (props.isDragging ? "white" : "black")};
  background-color: ${(props) => (props.isDragging ? ironBlue : "white")};
  transition: all 300ms ease-in-out;
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

export default class TicketPreview extends React.Component {
  render() {
    const timestamp = this.props.ticket.createdAt;

    // console.log(this.props.ticket.createdBy);
    // console.log(this.props.allUsers);

    let checkUser = (user) => user._id === this.props.ticket.createdBy;
    const ticketOwner = this.props.allUsers.find(checkUser);

    // console.log("OWNER IS" + ticketOwner);
    return (
      <Draggable draggableId={this.props.ticket._id} index={this.props.index}>
        {(provided, snapshot) => (
          <Link to={`/ticket/${this.props.ticket._id}`}>
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              <LabTag isDragging={snapshot.isDragging}>
                {this.props.ticket.lab}
              </LabTag>
              <br />
              {this.props.ticket.title}
              <br />
              {ticketOwner &&
                (ticketOwner.image ? (
                  <TicketOwner src={ticketOwner.image} />
                ) : (
                  <TicketOwner src={profile} />
                ))}
              <Timestamp isDragging={snapshot.isDragging}>
                Created <Moment fromNow>{timestamp}</Moment>
              </Timestamp>
            </Container>
          </Link>
        )}
      </Draggable>
    );
  }
}
