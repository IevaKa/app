import React from "react";
import data from "./data.js";
import styled from "styled-components";

import { DragDropContext } from "react-beautiful-dnd";

import Navbar from "../Navbar";
import Column from "../Column";

const Container = styled.div`
  display: flex;
`;

class DragTest extends React.Component {
  state = data;

  // onDragStart = () => {
  //   document.body.style.color = 'orange'
  // }

  onDragEnd = (result) => {
    document.body.style.color = "inherit";

    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index == source.index
    ) {
      return;
    }

    // moving inside the same column

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTicketIds = Array.from(start.ticketIds);
      newTicketIds.splice(source.index, 1); // removes item from original array position
      newTicketIds.splice(destination.index, 0, draggableId); // inserts in the new one

      const newColumn = {
        ...start,
        ticketIds: newTicketIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;
    }

    // moving between columns
    const startTicketIds = Array.from(start.ticketIds);
    startTicketIds.splice(source.index, 1);
    const newStart = {
      ...start,
      ticketIds: startTicketIds,
    };

    const finishTicketIds = Array.from(finish.ticketIds);
    finishTicketIds.splice(destination.index, 0, draggableId); // inserts in the new column
    const newFinish = {
      ...finish,
      ticketIds: finishTicketIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
  };

  render() {
    return (
      <>
        <Navbar />
        <DragDropContext
          // onDragStart={this.onDragStart}
          // onDragUpdate={this.onDragUpdate}
          onDragEnd={this.onDragEnd}
        >
          <Container>
            {this.state.columnOrder.map((columnId) => {
              // map through colum order to render columns
              const column = this.state.columns[columnId];
              const tickets = column.ticketIds.map(
                (ticketId) => this.state.tickets[ticketId]
              );

              // return column.title
              return (
                <Column key={column.id} column={column} tickets={tickets} />
              );
            })}
          </Container>
        </DragDropContext>
      </>
    );
  }
}

export default DragTest;

// import React, { Component } from 'react';
// import Navbar from '../Navbar';
// // import AddTicket from './AddTicket';
// import axios from 'axios';

// export default class Tickets extends Component {
//   state = {
//     data: []
//   }

//   getData = () => {
//     axios.get('/api/tickets').then(response => {
//       this.setState({
//         data: response.data
//       })
//     }).catch(err => {
//       console.log(err)
//     })
//   }

//   componentDidMount = () => {
//     this.getData()
//   }

//   render() {
//     console.log(this.state.data)
//     return (
//       <>
//       <Navbar/>
//       <ul>
//       {this.state.data.map(ticket => {
//         return(
//         <li key={ticket._id}>{ticket.title}</li>
//         )
//       })}
//       </ul>
//       </>
//     );
//   }
// }
