import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button } from '../../styles/global.js';

// import { Button } from './style.js';


function Home() {
  return (
    <div>
      <Link to='/signup'><Button primary>Signup</Button></Link>
      <Link to='/login'><Button>Login</Button></Link>
    </div>
  );
}

export default Home;
