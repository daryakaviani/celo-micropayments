import React, { Component } from "react";
import { Table, Card } from "react-bootstrap";
import SpinnerButton from "../SpinnerButton/SpinnerButton";

class Challenges extends Component {
  constructor(props) {
    super(props);
  }

  settle(id, favorSeller) {
    return this.props.settle(id, favorSeller).then(function (receipt) { console.log(receipt) });
  }

  handleSettler(id, favorSeller) {
    return event => {
      event.preventDefault();
      return this.settle(id, favorSeller);
    }
  }

  render() {
    return (
      <Card style={{
        color: "black", backgroundColor: "#C9E265"
      }
      }>
        <style type="text/css">
          {`
                        .btn-darker-green {
                        background-color: #C9E265;
                        color: black;
                        }

                        .btn-lighter-green{
                            background-color: #EFFFB1;
                            color:black;
                        }
                        `}
        </style>
        <Card.Header>Mediator Dashboard</Card.Header>
        <Card.Body>
          <h3>Mediator Dashboard</h3>
          <Table className="itemTable" style={{
            width:
              "95%"
          }}>
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
                  <td><SpinnerButton variant="darker-green" onClick={this.handleSettler(item.ID, false)}>Buyer</SpinnerButton> &nbsp;
                  <SpinnerButton variant="darker-green" onClick={this.handleSettler(item.ID, true)}>Seller</SpinnerButton></td>
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
