import React, { Component } from "react";
import { Button, Table, Card } from "react-bootstrap";
import Item from "../Item/Item";

class BuyerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { name: "Potatoes", cost: 5 },
        { name: "More potatoes", cost: 15 }
      ]
    };
  }
  render() {
    return (
      <Card>
        <Card.Header>What you're buying</Card.Header>
        <Card.Body>
          <h3>
            Pending transactions
          </h3>
          <table className="itemTable">
            <tbody>
              {this.state.items.map((item) => (
                <Item name={item.name} cost={item.cost} buttons={[
                  <Button onClick={() => {}}>I received this</Button>,
                  <Button onClick={() => {}}>Challenge</Button>
                ]}></Item>
              ))}
            </tbody>
          </table>
          <h3>
            Completed transactions
          </h3>
          <table className="itemTable">
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

export default BuyerDashboard;
