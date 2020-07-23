const data = {
  columns: {
    columnOpen: {
      id: "columnOpen",
      title: "Open",
      ticketIds: [
        "5f1840156c61b182859ee318",
        "5f1840286c61b182859ee319",
        "5f18402f6c61b182859ee31a",
      ], // keep adding and removing the tasks according to status
    },
    columnProgress: {
      id: "columnProgress",
      title: "In progress",
      ticketIds: ["5f190ebd6c61b182859ee31d"], 
    },
    columnDone: {
      id: "columnDone",
      title: "Done",
      ticketIds: ["5f190ed66c61b182859ee31e"], 
    },
  }
};

const order = {
  columnOrder: ["columnOpen", "columnProgress", "columnDone"],
}

export { data, order };

// we have to push the ticketids to the correct columns
// to render the tickets object, obj keys must be == obj.id




// import React, { useState, useEffect } from "react";
// import Navbar from "../Navbar";
// import axios from "axios";

// function Tickets() {
//   let [tickets, setTickets] = useState([]);

//   useEffect(() => {
//     axios
//       .get("/api/tickets")
//       .then((data) => {
//         setTickets(data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   let allTickets;
//   if (tickets.data) {
//     allTickets = tickets.data.map((ticket) => {
//       return <h2 key={ticket._id}>{ticket.title}</h2>;
//     });
//   } else {
//     tickets.data = null;
//   }

//   // console.log(tickets);

//   return (
//     <>
//       <Navbar />
//       {allTickets}
//     </>
//   );
// }

// export default Tickets;
