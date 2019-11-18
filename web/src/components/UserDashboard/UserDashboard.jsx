import React, { Component } from "react";
import Container from 'react-bootstrap/Container'
import BuyerDashboard from "../BuyerDashboard/BuyerDashboard";
import SellerDashboard from "../SellerDashboard/SellerDashboard";
import BuyItem from "../BuyItem/BuyItem"
import Challenges from "../Challenges/Challenges"
import { CardGroup, Button, Modal, InputGroup } from "react-bootstrap";
import "./UserDashboard.css";
import CeloContract from "../../contract";
import axios from "axios";

class UserDashboard extends Component {

  async loadData() {
    // Getting the buyinglist and the selling list
    await this.contract.init();
    this.setState(await this.contract.state());
    console.log(this.state);
    this.setState({ loaded: true })
    axios.get('http://localhost:4000/user/' + this.contract.address).then(res => {
      this.setState({ currentName: res.data });
      console.log(this.state.currentName);
    });
  }

  constructor(props) {
    super(props);
    this.contract = new CeloContract();
    this.state = {
      loaded: false,
      show: false,
      currentName: "",
      updatingName: ""
    };
    this.contract.listener = () => {
      this.loadData()
    }
  }

  componentDidMount() {
    this.loadData().catch(e => {
      console.error(e);
      this.setState({ error: e });
    });
  }

  handleClose = () => {
    this.setState({ show: false });
    this.setState({ currentName: this.state.updatingName });
    axios.post('http://localhost:4000/user', { name: this.state.currentName, address: this.contract.address })
      .then(res => {
        console.log("changed");
      })
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleChangeName = (event) => {
    this.setState({ updatingName: event.target.value });
  }

  render() {
    return (
      <div>
        <br />
        {this.state.error && <Container><pre><code>{this.state.error.toString()}</code></pre></Container>}
        {!this.state.error && !this.state.loaded && <Container>Loading...</Container>}
        {this.state.loaded && <Container>
          <h1>
            Hi, this is the User Dashboard for {this.state.currentName == "" ? this.contract.address : this.state.currentName}
          </h1>

          <Button onClick={this.handleShow}>
            Change Name
          </Button>
          <hr />

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Change Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input type="text" onChange={this.handleChangeName} placeholder="New Name"></input>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleClose}>
                Change Name
              </Button>
            </Modal.Footer>
          </Modal>

          <BuyerDashboard
            setClaimReceivedStatus={this.contract.setClaimReceivedStatus}
            buyingItems={this.state.pendingPurchases}
            boughtItems={this.state.completedPurchases}>
          </BuyerDashboard>
          <SellerDashboard
            makeItem={this.contract.makeItem}
            sellerChallenge={this.contract.sellerChallenge}
            sellingItems={this.state.currentInventory}
            soldItems={this.state.completedSales}></SellerDashboard>
          <CardGroup>
            <BuyItem buyItem={this.contract.buyItem}></BuyItem>
            <Challenges
              settle={this.contract.settle}
              challenges={this.state.challenges}>
            </Challenges>
          </CardGroup>
        </Container>}
      </div>
    );
  }
}

export default UserDashboard;
