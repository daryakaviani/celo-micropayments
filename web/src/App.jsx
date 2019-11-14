import React, { Component } from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import BuyItem from "./components/BuyItem/BuyItem";
import LoginPage from "./components/LoginPage/LoginPage"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/Login" component={LoginPage} />
            <Route exact path="/UserDashboard" component={UserDashboard} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
