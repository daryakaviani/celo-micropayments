/*
: l
0: "1"
1: "0xCCe64bAe8A291ca6dF731F1C62e85C28D7881911"
2: "0x0000000000000000000000000000000000000000"
3: "200"
4: false
5: "0x0000000000000000000000000000000000000000"
6: "0"
7: "0"
8: "0"
9: false
10: false
11: false
12: "0x0000000000000000000000000000000000000000"
ID: "1"
buyTime: "0"
buyerAddress: "0x0000000000000000000000000000000000000000"
challengeNonreceived: false
challengeTime: "0"
challengeWinner: "0x0000000000000000000000000000000000000000"
claimNonreceived: false
mediatorAddress: "0x0000000000000000000000000000000000000000"
price: "200"
received: false
sellerAcceptNonReceived: false
sellerAcceptTime: "0"
sellerAddress: "0xCCe64bAe8A291ca6dF731F1C62e85C28D7881911"
*/

import React, { Component } from "react";
import { Button, Badge, Card } from "react-bootstrap";
import Item from "../Item/Item";

const statusBadges = {
  'pending': <Badge variant="light">Pending</Badge>,
  'challenged': <Badge variant="danger">Challenged</Badge>
}

function SellerItem(props) {
  // const extraFields = [props.item.to || "No customer"]
  const buttons = []
  // if (props.item.status) extraFields.push(statusBadges[props.item.status])
  // if (props.hasProof) buttons.push(<Button>Proof of Delivery</Button>)

  return <Item name={props.id} cost={props.cost}
    buttons={buttons}
  ></Item>
}


class SellerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selling: [
        { name: "Carrots", cost: 3, time: "Oct 31, 2019", to: "Cookie Monster", status: "pending" },
        { name: "Lots of carrots", cost: 30, time: "Nov 6, 2019", to: "Elmo", status: "challenged" }
      ],
      sold: [
        { name: "Potatoed carrots", cost: 1, time: "Aug 12, 2019", to: "Swedish Chef" },
        { name: "Carrots inside potatoes", cost: 5, time: "Jan 24, 2018", to: "Kermit" }
      ]
    };
  }
  render() {
    return (
      <Card>
        <Card.Header>What you're selling</Card.Header>
        <Card.Body>
          <h3>Current Inventory</h3>
          <table class="itemTable">
            <thead>
              <th>Name</th>
              <th>Amount</th>
              <th>Recipient</th>
              <th>Status</th>
              <th>Time</th>
            </thead>
            <tbody>
              {this.props.sellingItems.map((item) => <SellerItem id={item["ID"]} cost={item["price"]} />)}
            </tbody>
          </table>
          <h3>Completed Sales</h3>
          <table class="itemTable">
            <thead>
              <th>Name</th>
              <th>Amount</th>
              <th>Recipient</th>
              <th>Time</th>
            </thead>
            <tbody>
              {this.state.sold.map((item) => <SellerItem item={item} />)}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    );
  }
}

export default SellerDashboard;
