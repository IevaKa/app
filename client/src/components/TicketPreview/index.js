import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import {
  darkGray,
  lightGray,
  ironBlue,
  ironPurple,
  ironRed,
  ironYellow,
  ironGreen,
  Button,
} from "../../styles/global.js";

const Container = styled.div`
  border: 1px solid black;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${(props) => (props.isDragging ? ironBlue : "white")};
`;

export default class TicketPreview extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.ticket._id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.ticket.lab} <br/>
            {this.props.ticket.description}
          </Container>
        )}
      </Draggable>
    );
  }
}
