import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  darkGray,
  lightGray,
  ironBlue,
  ironPurple,
  ironRed,
  ironYellow,
  ironGreen,
  Button
} from "../../styles/global.js";

import { Droppable } from "react-beautiful-dnd";

import Ticket from "../Ticket";

const Container = styled.div`
  margin: 8px;
  border: 1px solid black;
  border-radius: 2px;
  width: 250px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TicketList = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? ironBlue : 'white')};
  flex-grow: 1;
  min-height: 100px
`;

export default class Column extends React.Component {
  render() {
    console.log(this.props.tickets);

    return (
      <Container>
        <Title> {this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <TicketList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tickets.map((ticket, index) => <Ticket key={ticket.id} ticket={ticket} index={index}/>)}
              {provided.placeholder}
            </TicketList>
          )}
        </Droppable>
      </Container>
    );
  }
}
