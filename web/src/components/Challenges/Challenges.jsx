import React, { Component } from "react";
import { Button, Table, Card } from "react-bootstrap";

class Challenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { name: "Challenger 1", time: "6 hours"},
        { name: "Challenger 2", time: "1 week" },
        { name: "Challenger 3", time: "1 day"}
      ]
    };
  }
  render() {
    return (
      <Card>
        <Card.Header>Challenges</Card.Header>
        <Card.Body>
          <Table class="itemTable">
          <thead>
              <th>Name</th>
              <th>Choose Winner</th>
              <th>Time Elapsed</th>
            </thead>
            <tbody>
              {this.state.items.map((item) => (
                  <tr>
                  <td>{item.name}</td>
                  <td><Button onClick={() => {}}>Buyer</Button> &nbsp;
                  <Button onClick={() => {}}>Seller</Button></td>
                  <td>{item.time}</td>
                  </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}

export default Challenges;