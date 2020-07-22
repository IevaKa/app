import React from "react";
import { Route } from "react-router-dom";
import Navbar from "../Navbar/index";
import TicketBoard from "../TicketBoard/index";
import TicketAdd from "../TicketAdd/index";
import TicketEdit from "../TicketEdit/index";
import TicketDetail from "../TicketDetail/index";
import Profile from "../Profile/index";
import ProfileEdit from "../ProfileEdit/index";
import axios from "axios";


class MainDash extends React.Component {
  state = {
    data: []
  }

  getData = () => {
    axios.get('api/tickets')
  }


render (){
  return (
    <div>
      <Navbar/>
      <Route
        exact
        path='/addticket'
        component={TicketAdd}
      />
      <Route
        exact
        path='profile/:id'
        component={Profile}
      />
    </div>
  );
}
}

export default MainDash;
