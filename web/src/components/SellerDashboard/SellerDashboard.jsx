

import React, { Component } from "react";
import { Button, Badge, Card, Form } from "react-bootstrap";
import Item from "../Item/Item";
import NewItem from "../NewItem/NewItem";

class SellerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  handleMakeItem = (event) => {
    event.preventDefault();
    var priceNumber = parseInt(this.state.value);
    this.props.contract.methods.createItem(priceNumber).send({ from: this.props.account }).then(function (receipt) { console.log(receipt) });
  }

  handleMakeValueChange = (event) => {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <Card>
        <Card.Header>Seller Dashboard</Card.Header>
        <Card.Body>
          <h2>Make Item</h2>
          <Form>
            <Form.Group controlID="itemID">
              <Form.Label>Item Price</Form.Label>
              <Form.Control type="text" placeholder="" onChange={this.handleMakeValueChange} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.handleMakeItem}>
              Submit
                </Button>
          </Form>
          <hr></hr>
          <h3>Current Inventory</h3>
          <table class="itemTable">
            <thead>
              <th>ID</th>
              <th>Price</th>
              <th>Recipient</th>
              <th>Expected Deadline</th>
              <th>Challenge Status</th>
            </thead>
            <tbody>
              {this.props.sellingItems.map((item) => <NewItem account={this.props.account} contract={this.props.contract} item={item} type="selling" />)}
            </tbody>
          </table>
          <h3>Completed Sales</h3>
          <table class="itemTable">
            <thead>
              <th>Name</th>
              <th>Amount</th>
              <th>Recipient</th>
              <th>Bought Time</th>
            </thead>
            <tbody>
              {this.props.soldItems.map((item) => <NewItem account={this.props.account} contract={this.props.contract} item={item} type="sold" />)}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    );
  }
}

export default SellerDashboard;
