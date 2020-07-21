import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Tickets from './components/Tickets';
import AddTicket from './components/AddTicket';

class App extends React.Component {
  state = {
    user: this.props.user
  }

  setUser = user => {
    this.setState({
      user: user
    })
  }
  render() {
    return (
    <div className="App">
      <Navbar />
      <Route
        exact
        path='/'
        component={Home}
      />
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

        <Route
          exact
          path='/signup'
          render={props => <Signup setUser={this.setUser} {...props} />}
        />
        <Route
          exact
          path='/login'
          render={props => <Login setUser={this.setUser} {...props} />}
        />
        <Route
          exact
          path='/logout'
        />
    </div>
  );
}
}

export default App;
