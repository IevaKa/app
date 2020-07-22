const data = {
  tickets: {
    ticket1: { id: "ticket1", content: "problems with react" },
    ticket2: { id: "ticket2", content: "problems with mongo" },
    ticket3: { id: "ticket3", content: "problems with express" },
    ticket4: { id: "ticket4", content: "problems with life" },
    ticket5: { id: "ticket5", content: "problems with auth" }

  },
  columns: {
    column1: {
      id: "column1",
      title: "todo",
      ticketIds: ["ticket1", "ticket2"] // keep pushing and pulling the tasks according to status
    },
    column2: {
      id: "column2",
      title: "progress",
      ticketIds: ["ticket3", "ticket4"] // keep pushing and pulling the tasks according to status
    },
    column3: {
      id: "column3",
      title: "done",
      ticketIds: ["ticket5"] // keep pushing and pulling the tasks according to status
    }
  },
  columnOrder: ['column1', 'column2', 'column3']
};

export default data;
