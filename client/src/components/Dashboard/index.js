import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import Navbar from "../Navbar";
import TicketBoard from "../TicketBoard";
import TicketAdd from "../TicketAdd";
import Profile from "../Profile";
import TicketDetail from "../TicketDetail";
import TicketEdit from "../TicketEdit";

import { } from "../../styles/global.js";

const loadIn = keyframes`
 0% { opacity: 0; transform: translate(-50%, 0);}
 100% { opacity: 1; transform: translate(0, 0);}
`;

// const Animation = `${TicketAddAnm} 1.5s 1 ease-in-out`

const MainContainer = styled.div`
  display: flex;
  justify-content: left;
`;

const WrapperTicketBoard = styled.div`
  ${"" /* animation: ${loadIn} 1s ease-in-out; */}
`;

const WrapperNavbar = styled.div`
  z-index: 5;
  position: absolute;
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
  // let [result, setResult] = useState(null);
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
    // props.socket.emit('addTicket', () =>  getAllTicketsFromDb())
    // props.socket.emit('onDrag', () =>  getAllTicketsFromDb())
    // props.socket.on('onDrag', () =>  console.log('on drag DRAG DRAG DRAG'))
  }, []);

  // useEffect(() => {
  //    setColumns(columns);
  // }, [ticketadd]);

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

    // moving inside the same column

    // console.log('from: ' + source.droppableId + '  //  to: ' + destination.droppableId);
    // console.log('is: ' + draggableId);

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

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
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });

        // props.socket.on('onDrag', () =>  getAllTicketsFromDb())
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
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

      // console.log('dash socket here', props.socket)
      props.socket.emit('onDrag', {
        message: 'IEVA --> onDrag'
      })
      props.socket.emit('onDrag', () =>  getAllTicketsFromDb())
      
  };

  const handleTicketAdd = (socket) => {
    showTicketadd(true);
    showProfile(false);
  };

  const handleProfile = () => {
    showTicketadd(false);
    showProfile(true);
  };

  const getTicketDetails = (id) => {
    axios
      .get(`/api/tickets/${id}`)
      .then((response) => {
        console.log("the ticket ingo got: ", response.data);
        setTicketDetail(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const getSocket = socket => {
  //       socket.emit('onDrag', {
  //     message: 'this socket works --> onDrag'
  //   })
  // }
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
        <TicketDetail ticketDetail={ticketDetail} showTicketDetail={showTicketDetail}/>
      </WrapperTicketDetail>

      <WrapperTicketAdd ticketadd={ticketadd}>
        <TicketAdd
          showTicketadd={showTicketadd}
          getAllfromDb={getAllTicketsFromDb}
          socket={props.socket}
        />
      </WrapperTicketAdd>

      <WrapperProfile profile={profile}>
        <Profile showProfile={showProfile} setUser={props.setUser} {...props} />
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
          // getSocket={getSocket}
        />
      </WrapperTicketBoard>
    </MainContainer>
  );
};

export default Dashboard;
