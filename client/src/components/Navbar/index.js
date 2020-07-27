import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import styled, { keyframes } from "styled-components";

import plus from "../../files/plus.svg";
import bell from "../../files/bell.svg";
import profile from "../../files/b-user.svg";

import { ironRed, ironBlue } from "../../styles/global.js";

const Nav = styled.nav`
  background: linear-gradient(
    8deg,
    rgba(47, 199, 255, 1) 19%,
    rgba(135, 79, 255, 1) 96%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 135px;
  padding: 10px;
  font-size: 12px;
  z-index: 3;
`;

const PlusPic = styled.img`
  height: ${(props) => (props.addhover ? "35px" : "25px")};
  width: ${(props) => (props.addhover ? "35px" : "25px")};
  border-radius: 100px;
  transition: all 300ms ease-in-out;
`;

const UserPic = styled.img`
  width: ${(props) => (props.imghover ? "65px" : "60px")};
  border-radius: 100px;
  transition: all 300ms ease-in-out;
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 100px;
  ${"" /* background-color: red; */}
  transform-origin: center;
`;

const UserGreeting = styled.p`
  font-weight: 500;
  color: white;
  margin: 0;
`;

const AddTicket = styled.div`
  border-radius: 100px;
  ${"" /* border:   ${(props) => (props.addhover ? "2px solid white" : "2px solid ironRed" )}; */}
  height: 50px;
  width: 50px;
  background: black;
  ${"" /* background: linear-gradient(43deg, rgba(252,220,102,1) 11%, rgba(239,100,101,1) 63%); */}
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  transform: ${(props) => (props.addhover ? "rotate(180deg)" : "rotate(0deg)")};
  transition: all 1s ease-in-out;
  cursor: pointer
`;

const Notification = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 30px;
  cursor: pointer
`;

const NotificationBubble = styled.span`
  position: absolute;
  top: -8px;
  right: -10px;
  padding: 3px 7px 3px 7px;
  background-color: ${ironRed};
  color: white;
  font-size: 10px;
  border-radius: 100%;
  box-shadow: 1px 1px 1px gray;
  display: block;
`;

const NotificationDetails = styled.span`
  position: absolute;
  top: -8px;
  left: 50px;
  padding: 20px;
  width: 200px;
  ${'' /* width: ${(props) => (props.notifications ? "200px" : "0px")}; */}
  background-color: black;
  color: white;
  font-size: 10px;
  border-radius: 10px;
  display: block;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  opacity: ${(props) => (props.notifications ? 1 : 0)};
  pointer-events: ${(props) => (props.notifications ? "block" : "none")};
  transition: all 0.5s ease-in-out;
`;

const Icon = styled.img`
  height: ${(props) => (props.addhover ? "45px" : "30px")};
  width: ${(props) => (props.addhover ? "45px" : "30px")};
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 90px;
  transform-origin: center;
  cursor: pointer

`;

const Timestamp = styled.p`
  font-size: 9px;
  color: ${ironBlue};
  margin: 0;
`;

const Navbar = (props) => {
  let [user, setUser] = useState(null);
  let [imghover, setImghover] = useState(false);
  let [addhover, setAddhover] = useState(false);

  let [notifications, showNotifications] = useState(false);

  useEffect(() => {
    axios.get("/api/auth/loggedin").then((response) => {
      const user = response.data;
      setUser(user);
    });
  }, []);

  const toggleNotification = () => {
    showNotifications(!notifications);
  };

  if (notifications) setTimeout(() => { showNotifications(false) }, 3000);

  if (!user) return <></>;
  return (
    <Nav>
      <NavContainer>
        {user.role === "Student" ? (
          <AddTicket
            onClick={() => props.handleTicketAdd()}
            onMouseOver={() => {
              setAddhover(true);
            }}
            onMouseOut={() => {
              setAddhover(false);
            }}
            addhover={addhover}
          >
            <PlusPic src={plus} alt="Plus" addhover={addhover} />
          </AddTicket>
        ) : (
          <Link to="/dashboard">Dashboard</Link>
        )}
        <Notification onClick={toggleNotification}>
          <NotificationBubble>2</NotificationBubble>
          <NotificationDetails notifications={notifications}>
            Jeff has picked up your ticket!
            <Timestamp>12 minutes ago</Timestamp>
          </NotificationDetails>
          <Icon src={bell} alt="Notification" />
        </Notification>
      </NavContainer>
      <NavContainer>
        <UserGreeting>
          Hey
          <br />
          {user.name
            ? user.name.indexOf(" ") >= 0
              ? user.name.split(" ").slice(0, -1).join(" ")
              : user.name
            : "Ironhacker"}
          !
        </UserGreeting>
        <ImgContainer>
          {user.image ? (
            <UserPic
              src={user.image}
              alt="User Pic"
              onClick={() => props.handleProfile()}
              onMouseOver={() => {
                setImghover(true);
              }}
              onMouseOut={() => {
                setImghover(false);
              }}
              imghover={imghover}
            />
          ) : (
            <UserPic
              src={profile}
              alt="User Pic"
              onClick={() => props.handleProfile()}
              onMouseOver={() => {
                setImghover(true);
              }}
              onMouseOut={() => {
                setImghover(false);
              }}
              imghover={imghover}
            />
          )}
        </ImgContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
