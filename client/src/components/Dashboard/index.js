import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import Navbar from "../Navbar";
import TicketBoard from "../TicketBoard";
import TicketAdd from "../TicketAdd";
import Profile from "../Profile";
import TicketDetail from "../TicketDetail";
import { } from "../../styles/global.js";

const loadIn = keyframes`
 0% { opacity: 0; transform: translate(-50%, 0);}
 100% { opacity: 1; transform: translate(0, 0);}
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: left;
`;

const WrapperTicketBoard = styled.div`
  position: fixed;
`;

const WrapperNavbar = styled.div`
  z-index: 5;
  position: fixed;
  animation: ${loadIn} 1s ease-in-out;
`;

const WrapperProfile = styled.div`
  z-index: 2;
  position: absolute;
  opacity: ${(props) => (props.profile ? 1 : 0)};
  pointer-events: ${(props) => (props.profile ? "block" : "none")};
  transition: all 0.5s ease-in-out;
`;

const WrapperTicketDetail = styled.div`
  z-index: 2;
  position: absolute;
  opacity: ${(props) => (props.ticketdeets ? 1 : 0)};
  pointer-events: ${(props) => (props.ticketdeets ? "block" : "none")};
  transition: all 0.5s ease-in-out;
`;

const WrapperTicketAdd = styled.div`
  z-index: 2;
  position: absolute;
  opacity: ${(props) => (props.ticketadd ? 1 : 0)};
  pointer-events: ${(props) => (props.ticketadd ? "block" : "none")};
  transition: all 0.5s ease-in-out;
`;

const Dashboard = (props) => {
  let [allUsers, setAllUsers] = useState([]);

  let [columns, setColumns] = useState(null);
  let [tickets, setTickets] = useState([]);
  let [order, setOrder] = useState([]);
  let [role, setRole] = useState("Student");

  let [ticketDetail, setTicketDetail] = useState(false);

  let [ticketadd, showTicketadd] = useState(false);
  let [profile, showProfile] = useState(false);
  let [ticketdeets, showTicketDetail] = useState(false);

  useEffect(() => {
    axios.get("/api/user").then((users) => {
      setAllUsers(users.data);
    });
  }, []);

  const getAllTicketsFromDb = () => {
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

        setTickets(tickets);
        setColumns(columns);
        setRole(userRole);
        setOrder(
          userRole === "Student"
            ? ["columnOpen", "columnProgress", "columnCancelled"]
            : ["columnOpen", "columnProgress", "columnDone"]
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllTicketsFromDb();
    props.socket.on('addTicket', () =>  getAllTicketsFromDb())
    props.socket.on('onDrag', () =>  getAllTicketsFromDb())
    props.socket.on('assignTeacher', () =>  getAllTicketsFromDb())
  }, []);

  const onDragEnd = (result) => {
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
    if (role === "Student" && destination.droppableId === "columnProgress") {
      return alert("Only TAs can move Tickets to Progress");
    }
    if (role === "Student" && source.droppableId === "columnProgress" && destination.droppableId === "columnOpen") {
      return alert("You cannot move the ticket back");
    }
    if (source.droppableId === "columnDone" || source.droppableId === "columnCancelled") {
      return alert("The ticket has been closed");
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTicketIds = Array.from(start.ticketIds);
      newTicketIds.splice(source.index, 1);
      newTicketIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        ticketIds: newTicketIds,
      };

      const newState = {
        ...columns,
        [newColumn.id]: newColumn,
      };

      setColumns(newState);

      axios
        .put("/api/columns", {
          property: newColumn.id,
          array: newColumn.ticketIds,
        })
        .then((response) => {
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
    finishTicketIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      ticketIds: finishTicketIds,
    };

    const newState = {
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };

    setColumns(newState);

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
        props.socket.emit('onDrag', {
          message: 'IEVA --> onDrag'
        })
      })
      .catch((err) => {
        console.log(err);
      });      
  };

  const handleTicketAdd = (socket) => {
    showTicketadd(true);
    showProfile(false);
    showTicketDetail(false);
  };

  const handleProfile = () => {
    showTicketadd(false);
    showProfile(true);
    showTicketDetail(false);
  };

  const getTicketDetails = (id) => {
    axios
      .get(`/api/tickets/${id}`)
      .then((response) => {
        setTicketDetail(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MainContainer>
      <WrapperNavbar>
        <Navbar
          handleTicketAdd={handleTicketAdd}
          handleProfile={handleProfile}
          socket={props.socket}
        />
      </WrapperNavbar>

      <WrapperTicketDetail ticketdeets={ticketdeets}>
        <TicketDetail
          ticketDetail={ticketDetail}
          showTicketDetail={showTicketDetail}
          user={props.user}
          socket={props.socket}
          getAllfromDb={getAllTicketsFromDb}
          {...props}
        />
      </WrapperTicketDetail>

      <WrapperTicketAdd ticketadd={ticketadd}>
        <TicketAdd
          user={props.user}
          showTicketadd={showTicketadd}
          getAllfromDb={getAllTicketsFromDb}
          showTicketDetail={showTicketDetail}
          socket={props.socket}
        />
      </WrapperTicketAdd>

      <WrapperProfile profile={profile}>
        <Profile
          showProfile={showProfile}
          setUser={props.setUser}
          user={props.user}
          {...props}
        />
      </WrapperProfile>

      <WrapperTicketBoard>
        <TicketBoard
          allUsers={allUsers}
          columns={columns}
          tickets={tickets}
          order={order}
          role={role}
          setColumns={setColumns}
          setTickets={setTickets}
          onDragEnd={onDragEnd}
          getTicketDetails={getTicketDetails}
          showTicketDetail={showTicketDetail}
          socket={props.socket}
          user={props.user}

        />
      </WrapperTicketBoard>
    </MainContainer>
  );
};

export default Dashboard;
