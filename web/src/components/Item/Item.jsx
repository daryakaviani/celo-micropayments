import React, { Component } from "react";
import "./Item.css";

/**
 * Item is used for displaying transactions in the interface.
 * @param name    Name of the item being bought
 * @param buttons A map of button name => action
 */
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
        {(this.props.buttons || []).map((button) => (
          <td>
            {button}
          </td>
        ))}
      </tr>
    );
  }
}

export default Item;
