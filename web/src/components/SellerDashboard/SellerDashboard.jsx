import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Item from "../Item/Item";

class SellerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selling: [
        { name: "Carrots", cost: 3, time: "Oct 31, 2019" },
        { name: "Lots of carrots", cost: 30, time: "Nov 6, 2019" }
      ],
      sold: [
        { name: "Potatoed carrots", cost: 1, time: "Aug 12, 2019" },
        { name: "Carrots inside potatoes", cost: 5, time: "Jan 24, 2018" }
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
            <tbody>
              {this.state.selling.map((item) => (
                <Item name={item.name} cost={item.cost} time={item.time}></Item>
              ))}
            </tbody>
          </table>
          <h3>What You've Sold</h3>
          <table class="itemTable">
            <tbody>
              {this.state.sold.map((item) => (
                <Item name={item.name} cost={item.cost} time={item.time}></Item>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    );
  }
}

export default SellerDashboard;
