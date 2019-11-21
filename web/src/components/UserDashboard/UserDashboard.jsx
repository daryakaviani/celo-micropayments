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
import image from "../newImages.png";
import image2 from "../footerImage.png";

class UserDashboard extends Component {

  async loadData() {
    // Getting the buyinglist and the selling list
    await this.contract.init();
    this.setState(await this.contract.state());
    console.log(this.state);
    this.setState({ loaded: true })
    axios.get('/user/' + this.contract.address).then(res => {
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
    axios.post('/user', { name: this.state.updatingName, address: this.contract.address })
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
      <div style={{ background: "#303030" }}>
        <style type="text/css">
          {`
                        .btn-darker-green {
                        background-color: #C9E265;
                        color: black;
                        }

                        .btn-lighter-green{
                            background-color: #EFFFB1;
                            color:black;
                        }
                        `}
        </style>

        <br />
        {this.state.error && <Container><pre><code>{this.state.error.toString()}</code></pre></Container>}
        {!this.state.error && !this.state.loaded && <Container>Loading...</Container>}
        {this.state.loaded && <Container>
          <br />
          <div>
            <Button variant="darker-green" size="sm" style={{ float: "right" }} onClick={this.handleShow}>
              Change Name
            </Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={image} alt="Hello" height="250" width="444" />
          </div>
          <h1>
            Welcome, {this.state.currentName == "" ? this.contract.address : this.state.currentName}.
          </h1>
          <hr />

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "white" }}>Change Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input type="text" onChange={this.handleChangeName} placeholder="New Name"></input>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={this.handleClose}>
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
        <br />
        <img style={{ float: "right" }} src={image2} alt="" height="75px" width="133px" />
        <div><br /><br /></div>
        <br />
        <br />
      </div>
    );
  }
}

export default UserDashboard;
