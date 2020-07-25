import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { logout } from "../../services/auth.js";
import axios from "axios";

import styled, { keyframes } from "styled-components";

import {
  IronButton,
  ironBlue,
  ironRed,
  ironPurple,
  lightGray,
  StyledLink,
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

const UserPic = styled.img`
  width: ${(props) => (props.imghover ? "90px" : "80px")};
  border-radius: 100px;
  transition: all 300ms ease-in-out;
`;

const UserGreeting = styled.p`
color: white;
  padding: 20px 0 10px 0;
  height: 100px;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  height: 100px;
  transform-origin: center;
`;

const Tests = (props) => {
  let [user, setUser] = useState(null);
  let [imghover, setImghover] = useState(false);


  // const handleLogout = () => {
  //   logout().then(() => {
  //     setUser(null);
  //   });
  // };

  return (
   <></>
  );
};

export default Tests;



