import React, { useState } from "react";
import { Link, Route } from "react-router-dom";

import {
  Button,
  lightGray,
  lightBlue,
  lightPurple,
} from "../../styles/global.js";
import styled, { keyframes } from "styled-components";
import Lottie from "react-lottie";
import animationData from "../../files/animation.json";
import bg from "../../files/back.svg";
import heart from "../../files/heart.svg";
import code from "../../files/code.svg";

import Login from "../Login";

// import { Box, Test, Hidden } from './style.js';

const Animation = keyframes`
 0% { background-position: -20vw 120vh; opacity: 0 }
 100% { background-position: left bottom; opacity: 1 }
`;

const Container = styled.div`
  background-image: url(${bg});
  background-position: left bottom;
  background-repeat: no-repeat;
  background-size: 70% 70%;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  animation: ${Animation} 1.5s 1 ease-in-out;
`;

const Title = styled.h1`
  margin: 0 0 50px 0;
  text-align: left;
  font-size: 42px;
  font-weight: 700;
`;

const ContainerButtons = styled.div`
  margin: 0 0 100px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const ContainerHero = styled.div`
  margin: -70px -150px 0 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 600;
`;

const Icon = styled.img`
  color: lightGray;
  width: 14px;
  height: 14px;
  margin: 8px;
`;

const Signature = styled.div`
  font-size: 12px;
  text-align: right;
  position: absolute;
  bottom: 10px;
  right: 20px;
`;

const Close = styled.div`
  font-size: 30px;
  color: white;
  text-align: right;
  position: absolute;
  ${'' /* width: 20px;
  height: 20px; */}
  top: 10px;
  right: 20px;
  z-index: 4;
  cursor: pointer
`;

function Home(props) {
  let [login, setLogin] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Container>
      {login && <Login setUser={props.setUser} {...props} />}
      {login && <Close onClick={() => setLogin(false)}>CLOSEEE</Close>}

      <ContainerButtons>
        <Title>
          Welcome <br />
          to IronTickets.{" "}
        </Title>
        <Link to="/signup">
          <Button primary>Signup</Button>
        </Link>
        <Button onClick={() => setLogin(true)}>Login</Button>
      </ContainerButtons>
      <ContainerHero>
        <Lottie options={defaultOptions} height={800} width={350} />
      </ContainerHero>
      <Signature>
        <Icon src={code} />
        with
        <Icon src={heart} />
        by Eduarda, Ieva & Ivan
      </Signature>

      {/* <Hidden /> */}

      {/* <Box />
      <Test onClick={show()}>asasas</Test> */}
    </Container>
  );
}

export default Home;
