import React, { Component } from "react";
import TimeAgo from "react-timeago";
import "./Item.css";

/**
 * Item is used for displaying transactions in the interface.
 * @param name    Name of the item being bought
 * @param time    Time the item was bought
 * @param buttons A map of button name => action
 * @param extraFields Any extra table fields that should be included in this component
 */
class Item extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <tr class="item">
        <td>{this.props.name}</td>
        <td>${Number(this.props.cost).toFixed(2)} USD</td>
        {(this.props.extraFields || []).map((field) => (
          <td>
            {field}
          </td>
        ))}
        <td><TimeAgo date={this.props.time} /></td>
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
