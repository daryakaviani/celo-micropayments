import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Item from "../Item/Item";

class SellerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { name: "Carrots", cost: 3 },
        { name: "Lots of carrots", cost: 30 }
      ]
    };
  }
  render() {
    return (
      <Card>
        <Card.Header>What you're selling</Card.Header>
        <Card.Body>
          <table class="itemTable">
            <tbody>
              {this.state.items.map((item) => (
                <Item name={item.name} cost={item.cost}></Item>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    );
  }
}

export default SellerDashboard;
