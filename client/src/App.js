import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home/";
import TicketBoard from "./components/TicketBoard";
import TicketAdd from "./components/TicketAdd";
// import TicketDetail from "./components/TicketDetail";
// import TicketEdit from "./components/TicketEdit";
// import MainDash from "./components/MainDash";
// import Profile from "./components/Profile";
// import ProfileEdit from "./components/ProfileEdit";

class App extends React.Component {
  state = {
    user: this.props.user,
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />

        <Route exact path="/ticket/board" component={TicketBoard} />

        <Route exact path="/ticket/add" component={TicketAdd} />

        {/* <Route exact path="/ticket/:id" component={TicketDetail} /> */}

        {/* <Route exact path="/ticket/:id/edit" component={TicketEdit} /> */}

        {/* <Route exact path="/profile/:id" component={Profile} /> */}

        {/* <Route exact path="/profile/:id/edit" component={ProfileEdit} /> */}

        <Route
          exact
          path="/signup"
          render={(props) => <Signup setUser={this.setUser} {...props} />}
        />
        <Route
          exact
          path="/login"
          render={(props) => <Login setUser={this.setUser} {...props} />}
        />
      </div>
    );
  }
}

export default App;
