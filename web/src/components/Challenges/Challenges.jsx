import React, { Component } from "react";
import { Button, Table, Card } from "react-bootstrap";

class Challenges extends Component {
  constructor(props) {
    super(props);
  }

  settle(id, favorSeller) {
    this.props.settle(id, favorSeller).then(function (receipt) { console.log(receipt) });
  }

  handleSettler(id, favorSeller) {
    return event => {
      event.preventDefault();
      this.settle(id, favorSeller);
    }
  }

  render() {
    return (
      <Card style={{
        color: "black", backgroundColor: "#C9E265"
      }
      }>
        <Card.Header>Mediator Dashboard</Card.Header>
        <Card.Body>
          <h3>Mediator Dashboard</h3>
          <Table className="itemTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Choose Winner</th>
              </tr>
            </thead>
            <tbody>
              {this.props.challenges.map((item) => (
                <tr>
                  <td>{item["ID"]}</td>
                  <td><Button onClick={this.handleSettler(item.ID, false)}>Buyer</Button> &nbsp;
                  <Button onClick={this.handleSettler(item.ID, true)}>Seller</Button></td>
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
