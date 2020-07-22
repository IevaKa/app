import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home/';
import Tickets from './components/Tickets';
import AddTicket from './components/AddTicket';
import MainDash from './components/MainDash';

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
        path='/dashboard'
        component={MainDash}
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

    </div>
  );
}
}

export default App;
