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

import TicketPreview from "../TicketPreview";

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
  min-height: 300px;
  padding: 16px;
  background-color: red;

  ${'' /* background-color: ${props => (props.isDraggingOver ? ironBlue : 'white')}; */}
  flex-grow: 1;
`;

export default class Column extends React.Component {
  render() {
    // console.log(this.props.tickets); // array of objects

    return (
      <Container>
        <Title> {this.props.column.title}</Title>
        {this.props.tickets[0] ? (<Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <TicketList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            > :)
              {this.props.tickets.map((ticket, index) => <TicketPreview key={ticket._id} ticket={ticket} index={index}/>)}
              {provided.placeholder}
            </TicketList>
          )}
        </Droppable>) : (null)}
      </Container>
    ) ;
  }
}
