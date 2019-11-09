import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container'
import BuyerDashboard from "../BuyerDashboard/BuyerDashboard";
import SellerDashboard from "../SellerDashboard/SellerDashboard";
import Item from "../Item/Item";
import Web3 from 'web3';
import BuyItem from "../BuyItem/BuyItem"
import Challenges from "../Challenges/Challenges"
import { CardGroup } from "react-bootstrap";
import "./UserDashboard.css";
import { CELO_ABI, CELO_ADDRESS } from "../../config";

class UserDashboard extends Component {

  async loadData() {
    var ABI = CELO_ABI;
    var address = CELO_ADDRESS;

    // We are saving the web3, the current account, and the contract for later use
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    this.setState({ web3 })
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const contract = new web3.eth.Contract(ABI, address);
    this.setState({ contract });

    // Getting the buyinglist and the selling list
    var buyingList = await contract.methods.getBuyingItems(this.state.account).call();
    this.setState({ buyingList });
    var sellingList = await contract.methods.getSellingItems(this.state.account).call();
    this.setState({ sellingList });

    var itemsLength = await contract.methods.nextItemId().call();
    this.setState({ itemsLength })

    // We are setting the items in the contract's buyingList to our pendingPurchases
    for (var i = 0; i < buyingList.length; i++) {
      var nextItemID = buyingList[i];
      var nextItem = await contract.methods.items(parseInt(nextItemID, 10)).call();
      this.setState({ pendingPurchaces: [...this.state.pendingPurchaces, nextItem] });
    }

    // We are setting the items in the contract's sellingList to our currentInventory
    for (var i = 0; i < sellingList.length; i++) {
      var nextItemID = sellingList[i];
      var nextItem = await contract.methods.items(parseInt(nextItemID, 10)).call();
      this.setState({ currentInventory: [...this.state.currentInventory, nextItem] });
    }

    // We need to add to CompletedPurcheses so money redeeming will be possible.
    for (var i = 0; i < this.state.itemsLength; i++) {
      var currentItem = await contract.methods.items(i).call();
      if (currentItem["sellerAddress"] == this.state.account) {
        // The following code doesn't always work, we need to add seperate time-based functions that are booleans that say if the time has passed
        if (currentItem["received"] == true || currentItem["challengeWinner"] == currentItem["sellerAddress"]) {
          this.setState({ completedPurchases: [...this.state.completedPurchases, currentItem] });
        }
      }
    }
    // We need to add to Completed
  }

  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      username: "",
      account: "yolo",
      pendingPurchaces: [],
      completedPurchases: [],
      currentInventory: [],
      completedSales: [],
      buyItemName: "",
      buyItemId: -1,
      withProxy: false,
    };
  }

  componentWillMount() {
    this.loadData();
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
            Hi, this is the User Dashboard for {this.state.account}
          </h1>
          <BuyerDashboard buyingItems={this.state.pendingPurchaces}></BuyerDashboard>
          <SellerDashboard sellingItems={this.state.currentInventory}></SellerDashboard>
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
