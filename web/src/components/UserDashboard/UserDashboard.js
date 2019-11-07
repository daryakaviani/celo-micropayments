import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Item from "../Item/Item";

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    var id1 = 0;
    var id2 = 0;
    var props = props.location.state;
    if (props) {
      id1 = props.userId;
      id2 = props.userId2;
    }
    this.state = {
      userId1: id1,
      userId2: id2
    };
  }
  render() {
    return (
      <>
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
      <h1>
        Hi this is the user Dashboard for users {this.state.userId1} and
        {this.state.userId2}
      </h1>
      <table class="itemTable">
        <Item name="Potatoes" cost="5"></Item>
        <Item name="More Potatoes" cost="15"></Item>
      </table>
      </>
    );
  }
}

export default UserDashboard;
