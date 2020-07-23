render() {
  if (!this.state.columns) return (<></>)
  return (
    <>
      <Navbar />
      <DragDropContext
        // onDragStart={this.onDragStart}
        // onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Container>
          {this.state.order.columnOrder.map((columnId) => {
            // map through colum order to render columns
            const column = this.state.columns.columns[columnId];
            const tickets = column.ticketIds.map((ticketId) =>
              this.state.tickets.find((ticket) => ticket._id === ticketId)
            );

            
              /* console.log(tickets) */
            

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