import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import Navbar from "../Navbar/index";


function MainDash(props) {

  // let [user, setUser] = useState(props.user);

console.log(props)
console.log(props.test)


  return (
    <div>
      <Navbar/>
      dashboard :D
    </div>
  );
}

export default MainDash;
