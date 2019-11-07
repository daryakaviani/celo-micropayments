import React, { Component } from "react";
import Item from "../Item/Item";

class BuyerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
      <h2>
        Items bought
      </h2>
      <table class="itemTable">
        <Item name="Potatoes" cost="5"></Item>
        <Item name="More potatoes" cost="15"></Item>
      </table>
      </>
    );
  }
}

export default BuyerDashboard;
