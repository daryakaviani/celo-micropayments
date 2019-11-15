import React, { Component } from "react";
import Container from 'react-bootstrap/Container'
import BuyerDashboard from "../BuyerDashboard/BuyerDashboard";
import SellerDashboard from "../SellerDashboard/SellerDashboard";
import BuyItem from "../BuyItem/BuyItem"
import Challenges from "../Challenges/Challenges"
import { CardGroup } from "react-bootstrap";
import "./UserDashboard.css";
import CeloContract from "../../contract";

class UserDashboard extends Component {

  async loadData() {
    // Getting the buyinglist and the selling list
    await this.contract.init();
    this.setState(await this.contract.state());
    console.log(this.state);
    this.setState({ loaded: true })
  }

  constructor(props) {
    super(props);
    this.contract = new CeloContract();
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    this.loadData().catch(e => {
      console.error(e);
      this.setState({ error: e })
    });
  }

  render() {
    return (
      <div>
        <br />
        {this.state.error && <Container><pre><code>{this.state.error.toString()}</code></pre></Container>}
        {!this.state.error && !this.state.loaded && <Container>Loading...</Container>}
        {this.state.loaded && <Container>
          <h1>
            Hi, this is the User Dashboard for {this.contract.address}
          </h1>
          <BuyerDashboard
            setClaimReceivedStatus={this.contract.setClaimReceivedStatus.bind(this.contract)}
            buyingItems={this.state.pendingPurchases}
            boughtItems={this.state.completedPurchases}>
          </BuyerDashboard>
          <SellerDashboard
            makeItem={this.contract.makeItem.bind(this.contract)}
            sellerChallenge={this.contract.sellerChallenge.bind(this.contract)}
            sellingItems={this.state.currentInventory}
            soldItems={this.state.completedSales}></SellerDashboard>
          <CardGroup>
            <BuyItem buyItem={this.contract.buyItem.bind(this.contract)}></BuyItem>
            <Challenges
              settle={this.contract.settle.bind(this.contract)}
              challenges={this.state.challenges}>
            </Challenges>
          </CardGroup>
        </Container>}
      </div>
    );
  }
}

export default UserDashboard;
