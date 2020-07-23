import React from "react";
// import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button } from '../../styles/global.js';
import styled from "styled-components";

// import { Box, Test, Hidden } from './style.js';


const ContainerButtons = styled.div`
  display: flex;
  justify-content: center;
`;

function Home() {

  // let [visibility, setVisibility] = useState(false);

  // const show = () =>{
  //   setVisibility = true
  // }

  return (
    <>
    <ContainerButtons />
      {/* <Hidden /> */}
      <Link to='/signup'><Button primary>Signup</Button></Link>
      <Link to='/login'><Button>Login</Button></Link>
      {/* <Box />
      <Test onClick={show()}>asasas</Test> */}
    </>
  );
}

export default Home;
