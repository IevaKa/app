import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { logout } from "../../services/auth.js";
import axios from "axios";

import styled, { keyframes } from "styled-components";

import Navbar from "../Navbar";
import TicketBoard from "../TicketBoard";
import TicketAdd from "../TicketAdd";
import Profile from "../Profile";

import TicketDetail from "../TicketDetail";
import TicketEdit from "../TicketEdit";

import {
  IronButton,
  ironBlue,
  ironRed,
  ironPurple,
  lightGray,
  StyledLink,
} from "../../styles/global.js";

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
  ${'' /* animation: ${loadIn} 1s ease-in-out; */}
`;

const WrapperNavbar = styled.div`
  position: absolute;
  animation: ${loadIn} 1s ease-in-out;
`;

const WrapperProfile = styled.div`
  position: absolute;
  opacity: ${(props) => (props.profile ? 1 : 0)};
  pointer-events: ${(props) => (props.profile ? "block" : "none")};
  transition: all 0.5s ease-in-out;
`;

const WrapperTicketAdd = styled.div`
  position: absolute;
  opacity: ${(props) => (props.ticketadd ? 1 : 0)};
  pointer-events: ${(props) => (props.ticketadd ? "block" : "none")};
  transition: all 0.5s ease-in-out;
`;

const Dashboard = (props) => {
  // let [user, setUser] = useState(null);
  // let [ticketboard, showTicketboard] = useState(false);
  let [ticketadd, showTicketadd] = useState(false);
  let [profile, showProfile] = useState(false);

  const handleTicketAdd = () => {
    showTicketadd(true);
    showProfile(false);
  };

  const handleProfile = () => {
    showTicketadd(false);
    showProfile(true);
  };

  return (
    <MainContainer>
      <WrapperNavbar>
        <Navbar
          handleTicketAdd={handleTicketAdd}
          handleProfile={handleProfile}
        />
      </WrapperNavbar>
      <WrapperTicketAdd ticketadd={ticketadd}>
        <TicketAdd showTicketadd={showTicketadd} />
      </WrapperTicketAdd>

      <WrapperProfile profile={profile}>
        <Profile showProfile={showProfile} />
      </WrapperProfile>

      <WrapperTicketBoard>
        <TicketBoard />
      </WrapperTicketBoard>
    </MainContainer>
  );
};

export default Dashboard;
