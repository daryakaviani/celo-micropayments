import React, { Component } from "react";
import { Button, Badge, Card } from "react-bootstrap";
import Item from "../Item/Item";

const statusBadges = {
  'pending': <Badge variant="light">Pending</Badge>,
  'challenged': <Badge variant="danger">Challenged</Badge>
}

function SellerItem(props) {
  const extraFields = [ props.item.to || "No customer" ]
  const buttons = []
  if (props.item.status) extraFields.push(statusBadges[props.item.status])
  if (props.hasProof) buttons.push(<Button>Proof of Delivery</Button>)

  return <Item name={props.item.name} cost={props.item.cost}
               time={props.item.time} extraFields={extraFields}
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
              {this.state.selling.map((item) => <SellerItem item={item} hasProof />)}
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
