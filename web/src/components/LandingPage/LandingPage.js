import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import "./LandingPage.css";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Diego",
      name2: "Darya"
    };
  }

  renderUserDashboard = () => { //Go from LandingPage to UserDashboard
    this.props.history.push({
      pathname: "/UserDashboard",
      state: {
        userId: 1,
        userId2: 2
      }
    });
  };

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="../../logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {" React Bootstrap"}
          </Navbar.Brand>
        </Navbar>
        <h1 className="heading">
          Hello {this.state.name} and {this.state.name2}
        </h1>
        <Button onClick={this.renderUserDashboard}> Hello </Button>
      </div>
    );
  }
}

export default LandingPage;
