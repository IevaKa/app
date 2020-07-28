import React from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Navbar from "../Navbar";
import Column from "../Column";
import axios from "axios";

import { evenLighterGray, lightGray } from "../../styles/global.js";


const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${evenLighterGray};
`;

const WrapContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 135px;
  width: calc(100vw - 135px);
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
  border: 1px dashed ${lightGray};
  border-radius: 20px;
  ${'' /* background-color: rgba(156, 160, 163, 0.2) */}
`;

class TicketBoard extends React.Component {
  state = {
    columns: null,
    tickets: [],
    order: [],
    role: "Student",
  };

  // getting the data from the column model
  getTickets = () => {
    axios
      .get("/api/columns")
      .then((response) => {
        const columnData = response.data;
        const userRole = columnData.role;
        const tickets = columnData.columnOpen.concat(
          columnData.columnProgress,
          columnData.columnDone,
          columnData.columnCancelled
        );
        const columnOpen = {
          id: "columnOpen",
          title: "Open",
          ticketIds: columnData.columnOpen.map((ticket) => ticket._id),
        };
        const columnProgress = {
          id: "columnProgress",
          title: "In progress",
          ticketIds: columnData.columnProgress.map((ticket) => ticket._id),
        };

        const columnDone = {
          id: "columnDone",
          title: "Done",
          ticketIds: columnData.columnDone.map((ticket) => ticket._id),
        };

        const columnCancelled = {
          id: "columnCancelled",
          title: "Cancelled",
          ticketIds: columnData.columnCancelled.map((ticket) => ticket._id),
        };

        const columns = {
          columnOpen,
          columnProgress,
          columnDone,
          columnCancelled,
        };
        this.setState({
          tickets,
          columns,
          role: userRole,
          order:
            userRole === "Student"
              ? ["columnOpen", "columnProgress", "columnCancelled"]
              : ["columnOpen", "columnProgress", "columnDone"],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.getTickets();

  };

  // componentDidUpdate = () => {
  //   this.getTickets();
  // };
  

  onDragEnd = (result) => {
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
    if (
      this.state.role === "Student" &&
      destination.droppableId === "columnProgress"
    ) {
      return alert('Only TAs can move Tickets to Progress');
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

      console.log(newColumn);
      const newState = {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      };

      this.setState({
        columns: newState,
      });

      axios
        .put("/api/columns", {
          property: newColumn.id,
          array: newColumn.ticketIds,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
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

    const newState = {
      ...this.state.columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };

    this.setState({
      columns: newState,
    });

    const statusMap = {
      columnOpen: "Opened",
      columnProgress: "In progress",
      columnDone: "Solved",
      columnCancelled: "Cancelled",
    };

    const timestampMap = {
      columnProgress: "assignedAt",
      columnDone: "solvedAt",
      columnCancelled: "cancelledAt",
    };

    axios
      .put(`/api/tickets/${draggableId}`, {
        status: statusMap[destination.droppableId],
        destination: destination.droppableId,
        source: source.droppableId,
        sourceArray: startTicketIds,
        destinationArray: finishTicketIds,
        timestamp: timestampMap[destination.droppableId],
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <MainContainer>
        <DragDropContext
          // onDragStart={this.onDragStart}
          // onDragUpdate={this.onDragUpdate}
          onDragEnd={this.onDragEnd}
        >
          <WrapContainer>
            <Container>
              {this.state.columns &&
                this.state.order.map((columnId) => {
                  const column = this.state.columns[columnId];
                  // map through colum order to render columns
                  const tickets = column.ticketIds.map((ticketId) => {
                    return this.state.tickets.find(
                      (ticket) => ticket._id === ticketId
                    );
                  });
                  return (
                    <Column key={column.id} column={column} tickets={tickets} allUsers={this.props.allUsers} />
                  );
                })}
            </Container>
          </WrapContainer>
        </DragDropContext>
      </MainContainer>
    );
  }
}

export default TicketBoard;
