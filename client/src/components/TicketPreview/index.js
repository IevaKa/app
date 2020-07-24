import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { Draggable } from "react-beautiful-dnd";
import {

  ironBlue

} from "../../styles/global.js";
import { Link } from 'react-router-dom';

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
              <Link to={ `/ticket/${this.props.ticket._id}` }>{this.props.ticket.lab}</Link> <br/>
            {this.props.ticket.description}
          </Container>
        )}
      </Draggable>
        );
  }
}