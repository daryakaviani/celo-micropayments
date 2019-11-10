import React, { Component } from "react";
import { Button, Table, Card } from "react-bootstrap";

class Challenges extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card>
        <Card.Header>Challenges</Card.Header>
        <Card.Body>
          <h3>Challenges</h3>
          <Table class="itemTable">
            <thead>
              <th>ID</th>
              <th>Choose Winner</th>
            </thead>
            <tbody>
              {this.props.challenges.map((item) => (
                <tr>
                  <td>{item["ID"]}</td>
                  <td><Button onClick={() => { }}>Buyer</Button> &nbsp;
                  <Button onClick={() => { }}>Seller</Button></td>
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