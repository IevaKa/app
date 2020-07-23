import React from "react";
// import { data, order } from "./data.js";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Navbar from "../Navbar";
import Column from "../Column";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

class TicketBoard extends React.Component {
  state = {
    columns: null,
    tickets: [],
    order: ["columnOpen", "columnProgress", "columnDone"]
  };

  getTickets = () => {
    axios
      .get("/api/tickets")
      .then((response) => {
        this.setState({
          tickets: response.data,
        });
        this.updateTicketStates()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateTicketStates = () => {
    const openTickets =
      this.state.tickets
        .filter(ticket => ticket.status === 'Opened')
        .map(t => t._id)

    const inProgressTickets =
      this.state.tickets
        .filter(ticket => ticket.status === 'In progress')
        .map(t => t._id)

    const solvedTickets =
      this.state.tickets
        .filter(ticket => ticket.status === 'Solved')
        .map(t => t._id)

    const columnOpen = {
      id: "columnOpen",
      title: "Open",
      ticketIds: openTickets
    }

    const columnProgress = {
      id: "columnProgress",
      title: "In progress",
      ticketIds: inProgressTickets
    }

    const columnDone = {
      id: "columnDone",
      title: "Done",
      ticketIds: solvedTickets
    }

    const columns = {
      columnOpen,
      columnProgress,
      columnDone
    }
    this.setState({
      columns: columns
    });
    console.log('old state: ', columns)
  }

  // getColumns = () => {
  //   axios
  //     .get("/api/columns")
  //     .then((response) => {
  //       this.setState({
  //         columns: response.data,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  componentDidMount = () => {
    this.getTickets();
  };

  //   render() {
  //     console.log(this.state.columns);
  //     console.log(this.state.columns.columns);

  //     return (
  //       <>
  //         <Navbar />
  //         <ul>
  //           {this.state.tickets.map((ticket) => {
  //             return <li key={ticket._id}>{ticket.title}</li>;
  //           })}
  //           {this.state.columns.columnOrder.map((column, i) => {
  //             return <li key={i}>{column}</li>;
  //           })}
  //         </ul>
  //       </>
  //     );
  //   }
  // }

  // onDragStart = () => {
  //   document.body.style.color = 'orange'    // directly changing dom is kinda shitty in react
  // }

  onDragEnd = (result) => {
    document.body.style.color = "inherit";

    const { destination, source, draggableId } = result;
    console.log('on drag ', result)
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // moving inside the same column

    // console.log('from: ' + source.droppableId + '  //  to: ' + destination.droppableId);
    // console.log('is: ' + draggableId);

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
          ...this.state.columns,
          [newColumn.id]: newColumn,
      };

      this.setState({
        columns: newState,
      });
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
      ...this.state.columns,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState({
      columns: newState,
    });
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
            {this.state.columns && this.state.order.map((columnId) => {
              const column = this.state.columns[columnId];
              // map through colum order to render columns
              const tickets = column.ticketIds.map((ticketId) => {
                return this.state.tickets.find((ticket) => ticket._id === ticketId)
              })
              return (
                <Column key={column.id} column={column} tickets={tickets} />
              );
            })
            };
          </Container>
        </DragDropContext>
      </>
    );
  }
}

export default TicketBoard;