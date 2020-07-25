import React from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Navbar from "../Navbar";
import Column from "../Column";
import axios from "axios";

const MainContainer = styled.div`
  display: flex;
  justify-content: left;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${'' /* background-color: blue; */}
  width: 100vw;
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
        this.getColumns()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // getting the data from the column model
  // will eventually replace the get tickets function
  getColumns = () => {
    axios
      .get("/api/columns")
      .then(response => {
        const columnData = response.data
        const columnOpen = {
          id: "columnOpen",
          title: "Open",
          ticketIds: columnData.columnOpen
        }
        const columnProgress = {
          id: "columnProgress",
          title: "In progress",
          ticketIds: columnData.columnProgress
        }
    
        const columnDone = {
          id: "columnDone",
          title: "Done",
          ticketIds: columnData.columnDone
        }
        const columns = {
          columnOpen,
          columnProgress,
          columnDone
        }
        this.setState({
          columns: columns,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

      console.log(newColumn)
      const newState = {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      };

      this.setState({
        columns: newState,
      });

      axios.put('/api/columns', {
        property: newColumn.id,
        array: newColumn.ticketIds
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
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

    console.log('destination ', destination.droppableId)
    console.log('source ', source.droppableId)
    // arrays to pass in the column
    console.log('start tickets ', startTicketIds)
    console.log('finish tickets ', finishTicketIds)

    const newState = {
      ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
    };

    this.setState({
      columns: newState,
    });

    const statusMap = {
      columnOpen: 'Opened',
      columnProgress: 'In progress', 
      columnDone: 'Solved'
    }
    
    axios.put(`/api/tickets/${draggableId}`, {
      status: statusMap[destination.droppableId],
      destination: destination.droppableId, // progress
      source: source.droppableId, // open
      sourceArray: startTicketIds,
      destinationArray: finishTicketIds
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
    };

  render() {
    return (
      <MainContainer>
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
            }
          </Container>
        </DragDropContext>
      </MainContainer>
    );
  }
}

export default TicketBoard;