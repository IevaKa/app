import React from "react";
import { Route, Link } from "react-router-dom";
import Navbar from "../Navbar/index";
import TicketBoard from "../TicketBoard/index";
import TicketAdd from "../TicketAdd/index";
import TicketEdit from "../TicketEdit/index";
import TicketDetail from "../TicketDetail/index";
import Profile from "../Profile/index";
import ProfileEdit from "../ProfileEdit/index";
import axios from "axios";


class MainDash extends React.Component {
  // state = {
  //   data: []
  // }

  // getData = () => {
  //   axios.get('api/tickets').then(response => {
  //     this.setState({
  //       data: response.data
  //     })
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }

  // componentDidMount = () => {
  //   this.getData()
  // }


render (){
  console.log('hello')
  return (
    <div>
      <Navbar/>
      <TicketBoard />
    </div>
  );
}
}

export default MainDash;
