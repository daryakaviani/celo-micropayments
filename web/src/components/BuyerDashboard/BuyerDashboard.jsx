import React, { Component } from "react";
import { Button, Table, Card } from "react-bootstrap";
import Item from "../Item/Item";
import NewItem from "../NewItem/NewItem";

class BuyerDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <Card.Header>What you're buying</Card.Header>
        <Card.Body>
          <h3>
            Pending purchases
          </h3>
          <table className="itemTable">
            <thead>
              <th>ID</th>
              <th>Amount</th>
              <th>Seller</th>
              <th>Buttons</th>
            </thead>
            <tbody>
              {this.props.buyingItems.map((item) => <NewItem type="buying" item={item}></NewItem>)}
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
            </thead>
            <tbody>
              {this.props.boughtItems.map((item) => (<NewItem type="bought" item={item} />))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    );
  }
}

export default BuyerDashboard;
