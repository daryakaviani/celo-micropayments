

import React, { Component } from "react";
import { Button, Card, Form } from "react-bootstrap";
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
    this.props.makeItem({ price: priceNumber }).then((receipt) => { console.log(receipt) });
  }

  handleMakeValueChange = (event) => {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <Card style={{
        color: "black", backgroundColor: "#C9E265"
      }
      }>
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
        <Card.Header>Seller Dashboard</Card.Header>
        <Card.Body>
          <h2 style={{ color: "white" }}>Make Item</h2>
          <Form>
            <Form.Group controlId="itemID">
              <Form.Label style={{ color: "white" }}>Item Price</Form.Label>
              <Form.Control type="text" placeholder="" onChange={this.handleMakeValueChange} />
            </Form.Group>
            <Button variant="darker-green" type="submit" onClick={this.handleMakeItem}>
              Submit
                </Button>
          </Form>
          <hr></hr>
          <h3>Current Inventory</h3>
          <table className="itemTable" style={{ width: "95%" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Price</th>
                <th>Recipient</th>
                <th>Expected Deadline</th>
                <th>Challenge Status</th>
              </tr>
            </thead>
            <tbody>
              {this.props.sellingItems.map((item) => <NewItem sellerChallenge={
                (challenge) => this.props.sellerChallenge(item.ID, challenge)
              } item={item} key={item.ID} type="selling" />)}
            </tbody>
          </table>
          <h3>Completed Sales</h3>
          <table className="itemTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Recipient</th>
                <th>Bought Time</th>
                <th>Challenge Type</th>
                <th>Redeem if Sold</th>
              </tr>
            </thead>
            <tbody>
              {this.props.soldItems.map((item) => <NewItem item={item}
                key={item.ID}
                sellerRedeem={() => this.props.redeem(item.ID)}
                type="sold" />)}
            </tbody>
          </table>
        </Card.Body>
      </Card >
    );
  }
}

export default SellerDashboard;
