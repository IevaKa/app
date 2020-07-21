import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Route } from 'react-router-dom';
// import Projects from './components/Projects';
import Navbar from './components/Navbar';
import Tickets from './components/Tickets';
import AddTicket from './components/AddTicket';
// import ProjectDetails from './components/ProjectDetails';
// import TaskDetails from './components/TaskDetails';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Route
        exact
        path='/tickets'
        component={Tickets}
      />

      <Route
        exact
        path='/tickets/create'
        component={AddTicket}
      />
    </div>
  );
}

export default App;
