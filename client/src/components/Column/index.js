import React from "react";
import styled from "styled-components";

import { Droppable } from "react-beautiful-dnd";

import TicketPreview from "../TicketPreview";

import { ironPurple } from "../../styles/global.js";

const Container = styled.div`
  margin: 10px;
  ${"" /* border: 1px solid ${lightGray}; */}
  border-radius: 10px;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h3`
  padding: 12px;
  text-transform: uppercase;
  font-size: 14px;
  background-color: ${ironPurple};
  color: white;
  width: 220px;
  border-radius: 5px;
`;

const TicketList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200px;
  border-radius: 10px;
  padding: 8px;
  width: 220px;

  background-color: ${(props) =>
    props.isDraggingOver
      ? "rgba(156, 160, 163, 0.2)"
      : "rgba(156, 160, 163, 0.0)"};
  flex-grow: 1;
  transition: all 300ms ease-in-out;
`;

export default class Column extends React.Component {
  render() {
    // console.log(this.props.tickets); // array of objects
    const propsLoaded = this.props.tickets;
    // console.log(propsLoaded);

    return (
      <Container>
        <Title> {this.props.column.title}</Title>
        {propsLoaded[0] ? (
          <Droppable droppableId={this.props.column.id}>
            {(provided, snapshot) => (
              <TicketList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {this.props.tickets.map((ticket, index) => (
                  <TicketPreview
                    key={ticket._id}
                    ticket={ticket}
                    index={index}
                    allUsers={this.props.allUsers} 
                    getTicketDetails={this.props.getTicketDetails}
                    showTicketDetail={this.props.showTicketDetail}
                  />
                ))}
                {provided.placeholder}
              </TicketList>
            )}
          </Droppable>
        ) : (
          <Droppable droppableId={this.props.column.id}>
            {(provided, snapshot) => (
              <TicketList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {provided.placeholder}
              </TicketList>
            )}
          </Droppable>
        )}
      </Container>
    );
  }
}
