import React, { Component } from "react";
import "./Item.css";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO: State?
    };
  }
  render() {
    return (
      <tr class="item">
        <td>{this.props.name}</td>
        <td>${Number(this.props.cost).toFixed(2)}</td>
      </tr>
    );
  }
}

export default Item;
