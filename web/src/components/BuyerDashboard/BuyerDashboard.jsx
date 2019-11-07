import React, { Component } from "react";
import { Button, Table, Card } from "react-bootstrap";
import Item from "../Item/Item";

class BuyerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: [
        { name: "Potatoes", cost: 5, time: "Nov 1, 2019" },
        { name: "More potatoes", cost: 15, time: "Nov 7, 2019" }
      ],
      completed: [
        { name: "A good ol' sack o' potaters", cost: 50, time: "Aug 1, 2019" },
        { name: "Pototato pot pie", cost: 3, time: "Nov 9, 2018" }
      ],
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
            <thead>
              <th>Name</th>
              <th>Amount</th>
              <th>Time</th>
            </thead>
            <tbody>
              {this.state.pending.map((item) => (
                <Item name={item.name} cost={item.cost} time={item.time}
                      buttons={[
                        <Button onClick={() => {}}>I received this</Button>,
                        <Button onClick={() => {}}>I didn't receive this</Button>
                      ]}>
                </Item>
              ))}
            </tbody>
          </table>
          <h3>
            Completed transactions
          </h3>
          <table className="itemTable">
            <thead>
              <th>Name</th>
              <th>Amount</th>
              <th>Time</th>
            </thead>
            <tbody>
              {this.state.completed.map((item) => (
                <Item name={item.name} cost={item.cost} time={item.time}></Item>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    );
  }
}

export default BuyerDashboard;
