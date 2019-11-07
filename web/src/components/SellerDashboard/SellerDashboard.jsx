import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Item from "../Item/Item";

function SellerItem(props) {
  return <Item name={props.item.name} cost={props.item.cost}
               time={props.item.time}
               extraFields={[props.item.to || "No customer"]}
         ></Item>
}

class SellerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selling: [
        { name: "Carrots", cost: 3, time: "Oct 31, 2019", to: "Cookie Monster" },
        { name: "Lots of carrots", cost: 30, time: "Nov 6, 2019", to: "Elmo" }
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
              <th>Time</th>
            </thead>
            <tbody>
              {this.state.selling.map((item) => <SellerItem item={item} />)}
            </tbody>
          </table>
          <h3>What You've Sold</h3>
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
