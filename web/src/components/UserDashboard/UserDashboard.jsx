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

    var itemsLength = await contract.methods.nextItemID().call();
    this.setState({ itemsLength })
    // We are setting the items in the contract's buyingList to our pendingPurchases
    for (var i = 0; i < buyingList.length; i++) {
      var nextItemID = buyingList[i];
      var nextItem = await contract.methods.items(parseInt(nextItemID, 10)).call();
      if (nextItem["received"] == false) {
        this.setState({ pendingPurchaces: [...this.state.pendingPurchaces, nextItem] });
      }
    }

    // We are setting the items in the contract's sellingList to our currentInventory
    for (var i = 0; i < sellingList.length; i++) {
      var nextItemID = sellingList[i];
      var nextItem = await contract.methods.items(parseInt(nextItemID, 10)).call();
      console.log(nextItem);
      if (nextItem["received"] == false) {
        this.setState({ currentInventory: [...this.state.currentInventory, nextItem] });
      }
    }

    // This function adds an item to either the already sold, already bought, or currently challenged
    for (var i = 0; i < this.state.itemsLength; i++) {
      var currentItem = await contract.methods.items(i).call();
      if (this.addToSold(currentItem)) {
        this.setState({ completedSales: [...this.state.completedSales, currentItem] });
      }
      if (this.addToBought(currentItem)) {
        this.setState({ completedPurchases: [...this.state.completedPurchases, currentItem] });
      }
      if (this.addToChallenges(currentItem)) {
        this.setState({ challenges: [...this.state.challenges, currentItem] });
      }
    }
  }

  addToSold = (currentItem) => {
    if (currentItem["sellerAddress"] == this.state.account && currentItem["received"] == true) {
      return true;
    }
    return false;
  }

  addToBought = (currentItem) => {
    if (currentItem["buyerAddress"] == this.state.account && currentItem["received"] == true) {
      return true;
    }
    return false;
  }

  addToChallenges = (currentItem) => {
    console.log(currentItem);
    if (currentItem["mediatorAddress"] == this.state.account && currentItem["received"] == false) {
      return true;
    }
    return false;
  }

  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      username: "",
      account: "",
      pendingPurchaces: [],
      completedPurchases: [],
      currentInventory: [],
      completedSales: [],
      challenges: [],
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
      <div>
        <br />
        <Container>
          <h1>
            Hi, this is the User Dashboard for {this.state.account}
          </h1>
          <BuyerDashboard account={this.state.account} contract={this.state.contract} buyingItems={this.state.pendingPurchaces} boughtItems={this.state.completedPurchases}></BuyerDashboard>
          <SellerDashboard account={this.state.account} contract={this.state.contract} sellingItems={this.state.currentInventory} soldItems={this.state.completedSales}></SellerDashboard>
          <CardGroup>
            <BuyItem name="Potatoes" ID="1234"></BuyItem>
            <Challenges account={this.state.account} contract={this.state.contract} challenges={this.state.challenges}></Challenges>
          </CardGroup>
        </Container>
      </div>
    );
  }
}

export default UserDashboard;
