import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import { ironBlue, lightBlue, lightGray } from "../../styles/global.js";

import Moment from "react-moment";

const Container = styled.div`
  font-size: 14px;
  border: 1px solid ${lightGray};
  width: 180px;
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

export default class TicketPreview extends React.Component {
  render() {
    const dateToFormat = this.props.ticket.createdAt;

    console.log(this.props.ticket);
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
              <Timestamp isDragging={snapshot.isDragging}>
                Created <Moment fromNow>{dateToFormat}</Moment>
              </Timestamp>
            </Container>
          </Link>
        )}
      </Draggable>
    );
  }
}
