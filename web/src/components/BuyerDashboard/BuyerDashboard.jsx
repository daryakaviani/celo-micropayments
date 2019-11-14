import React, { Component } from "react";
import { Button, Table, Card, Form } from "react-bootstrap";
import Item from "../Item/Item";
import NewItem from "../NewItem/NewItem";

class BuyerDashboard extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Card>
        <Card.Header>Buyer Dashboard</Card.Header>
        <Card.Body>

          <h3>
            Pending purchases
          </h3>
          <table className="itemTable">
            <thead>
              <th>ID</th>
              <th>Amount</th>
              <th>Seller</th>
              <th>Expected Arrival</th>
              <th>Actions</th>
            </thead>
            <tbody>
              {this.props.buyingItems.map((item) => <NewItem account={this.props.account} contract={this.props.contract} type="buying" item={item}></NewItem>)}
            </tbody>
          </table>
          <h3>
            Completed purchases
          </h3>
          <table className="itemTable">
            <thead>
              <th>ID</th>
              <th>Amount</th>
              <th>Seller</th>
              <th>Bought Time</th>
            </thead>
            <tbody>
              {this.props.boughtItems.map((item) => (<NewItem account={this.props.account} contract={this.props.contract} type="bought" item={item} />))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    );
  }
}

export default BuyerDashboard;
