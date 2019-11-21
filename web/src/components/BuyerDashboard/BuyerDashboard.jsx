import React, { Component } from "react";
import { Card } from "react-bootstrap";
import NewItem from "../NewItem/NewItem";
import "./BuyerDashboard.css";

class BuyerDashboard extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Card style={{
        color: "black", backgroundColor: "#C9E265"
      }
      }>
        <Card.Header>Buyer Dashboard</Card.Header>
        <Card.Body>
          <h3>
            Pending purchases
          </h3>
          <table className="itemTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Seller</th>
                <th>Expected Arrival</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.buyingItems.map((item) => <NewItem setClaimReceivedStatus={
                (rec) => this.props.setClaimReceivedStatus(item.ID, rec)
              } type="buying" key={item.ID} item={item}></NewItem>
              )}
            </tbody>
          </table>
          <h3>
            Completed purchases
          </h3>
          <table className="itemTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Seller</th>
                <th>Bought Time</th>
              </tr>
            </thead>
            <tbody>
              {this.props.boughtItems.map((item) => (<NewItem type="bought"
                key={item.ID}
                item={item} />))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    );
  }
}

export default BuyerDashboard;
