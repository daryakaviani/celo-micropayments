import React, { Component } from "react";
import "./Item.css";

class BuyItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name = BuyItem.name
    };
  }
  render() {
    return(
        <textarea>
            Buy Item
        </textarea>
        <tr class="userID">
            <td>{this.props.userID}</td>
        </tr>
        <tr class="item">
            <td>{this.props.name}</td>
            <td>${Number(this.props.cost).toFixed(2)}</td>
        </tr>
        // set the state of the proxy here
        <button onClick={key="With Proxy"}> 
            With Proxy
        </button>
        <button onClick={key="Without Proxy"}>
            Without Proxy
        </button>
    );
  }
}

export default BuyItem;