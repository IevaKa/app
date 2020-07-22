import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import ColOpen from "../ColOpen";
import DragTest from "../DragTest";

import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Tickets() {
  let [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios
      .get("/api/tickets")
      .then((data) => {
        setTickets(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let allTickets;
  if (tickets.data) {
    allTickets = tickets.data.map((ticket) => {
      return <h2 key={ticket._id}>{ticket.title}</h2>;
    });
  } else {
    tickets.data = null;
  }

  // console.log(tickets);

  return (
    <>
      <Navbar />
      <DragTest />
      {/* <DragDropContext>
        <ColOpen tickets={allTickets} />
      </DragDropContext> */}
    </>
  );
}

export default Tickets;
