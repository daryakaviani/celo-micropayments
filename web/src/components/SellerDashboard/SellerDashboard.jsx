

import React, { Component } from "react";
import { Button, Badge, Card } from "react-bootstrap";
import Item from "../Item/Item";
import NewItem from "../NewItem/NewItem";

class SellerDashboard extends Component {
  constructor(props) {
    super(props);
  }

  async

  render() {
    return (
      <Card>
        <Card.Header>Seller Dashboard</Card.Header>
        <Card.Body>
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
