import React from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../Column";

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
  ${"" /* background-color: rgba(156, 160, 163, 0.2) */}
`;

class TicketBoard extends React.Component {
  render() {
    return (
      <MainContainer>
        <DragDropContext
          // onDragStart={this.onDragStart}
          // onDragUpdate={this.onDragUpdate}
          onDragEnd={this.props.onDragEnd}
        >
          <WrapContainer>
            <Container>
              {this.props.columns &&
                this.props.order.map((columnId) => {
                  const column = this.props.columns[columnId];
                  // map through colum order to render columns
                  const tickets = column.ticketIds.map((ticketId) => {
                    return this.props.tickets.find(
                      (ticket) => ticket._id === ticketId
                    );
                  });
                  return (
                    <Column
                      key={column.id}
                      column={column}
                      tickets={tickets}
                      allUsers={this.props.allUsers}
                      setColumns={this.props.setColumns}
                      getTicketDetails={this.props.getTicketDetails}
                      showTicketDetail={this.props.showTicketDetail}
                      // user={this.props.user}
                    />
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
