import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button } from '../../styles/global.js';

import { Box, Test, Hidden } from './style.js';


function ColProgress() {

  let [visibility, setVisibility] = useState(false);

  const show = () =>{
    setVisibility = true
  }

  return (
    <div>
      <Hidden />
      <Link to='/signup'><Button primary>Signup</Button></Link>
      <Link to='/login'><Button>Login</Button></Link>
      <Box />
      <Test onClick={show()}>asasas</Test>
    </div>
  );
}

export default ColProgress;
