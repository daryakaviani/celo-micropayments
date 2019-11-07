import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container'
import BuyerDashboard from "../BuyerDashboard/BuyerDashboard";
import SellerDashboard from "../SellerDashboard/SellerDashboard";
import Item from "../Item/Item";
import BuyItem from "../BuyItem/BuyItem"
import Challenges from "../Challenges/Challenges"
import {CardGroup } from "react-bootstrap";
import "./UserDashboard.css";

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
            Hi, this is the User Dashboard for User {this.state.userId}
          </h1>
              <BuyerDashboard></BuyerDashboard>
              <SellerDashboard></SellerDashboard>
          <CardGroup>
            <BuyItem name="Potatoes" ID="1234"></BuyItem>
            <Challenges></Challenges>
          </CardGroup>
        </Container>
      </>
    );
  }
}

export default UserDashboard;
