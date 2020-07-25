import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { logout } from "../../services/auth.js";
import axios from "axios";

import styled, { keyframes } from "styled-components";

import plus from "../../files/plus.svg";
import bell from "../../files/bell.svg";

import {
  IronButton,
  ironBlue,
  ironRed,
  ironPurple,
  lightGray,
  StyledLink,
  ironYellow,
} from "../../styles/global.js";

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
`;

const PlusPic = styled.img`
  height: ${(props) => (props.addhover ? "35px" : "25px")};
  width: ${(props) => (props.addhover ? "35px" : "25px")};
  border-radius: 100px;
  transition: all 300ms ease-in-out;
`;

const UserPic = styled.img`
  width: ${(props) => (props.imghover ? "85px" : "80px")};
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
  color: white;
  padding: 0 20px 0 20px;
  margin: 0 0 8px 0;
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
`;

const Notification = styled.img`
  height: ${(props) => (props.addhover ? "45px" : "30px")};
  width: ${(props) => (props.addhover ? "45px" : "30px")};
  margin: 30px 0;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 90px;
  ${"" /* background-color: yellow; */}
  transform-origin: center;
`;

const Navbar = (props) => {
  let [user, setUser] = useState(null);
  let [imghover, setImghover] = useState(false);
  let [addhover, setAddhover] = useState(false);

  useEffect(() => {
    axios.get("/api/auth/loggedin").then((response) => {
      const user = response.data;
      setUser(user);
    });
  }, []);

  // const handleLogout = () => {
  //   logout().then(() => {
  //     setUser(null);
  //   });
  // };

  if (!user) return <></>;
  return (
    <Nav>
      <NavContainer>
        {user.role === "Student" ? (
          <Link to="/ticket/add">
            <AddTicket
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
          </Link>
        ) : (
          <Link to="/ticket/board">Dashboard</Link>
        )}
        <Notification src={bell} alt="Notification" />
      </NavContainer>

      {/* <Link to="/" onClick={() => handleLogout(props)}>
          Logout
        </Link> */}
      <Link to={`/profile/${user._id}`}>
        <NavContainer>
          <UserGreeting>
            Hey {user.name.split(" ").slice(0, -1).join(" ")}!
          </UserGreeting>
          <ImgContainer>
            <UserPic
              src={user.image}
              alt="User Pic"
              onMouseOver={() => {
                setImghover(true);
              }}
              onMouseOut={() => {
                setImghover(false);
              }}
              imghover={imghover}
            />
          </ImgContainer>
        </NavContainer>
      </Link>
    </Nav>
  );
};

export default Navbar;

// do an if statement if the user has no pic
