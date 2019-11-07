import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container'
import BuyerDashboard from "../BuyerDashboard/BuyerDashboard";
import SellerDashboard from "../SellerDashboard/SellerDashboard";

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    const locationState = props.location.state;
    this.state = {
      userId: locationState ? locationState.userId : 0,
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
        <Container>
          <h1>
            Hi this is the user Dashboard for user {this.state.userId}
          </h1>
          <BuyerDashboard></BuyerDashboard>
          <SellerDashboard></SellerDashboard>
        </Container>
      </>
    );
  }
}

export default UserDashboard;
