import React, { Component } from "react";
import Item from "../Item/Item";

class SellerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
      <h2>
        Items sold
      </h2>
      <table class="itemTable">
        <Item name="Carrots" cost="3"></Item>
        <Item name="Lots of carrots" cost="15"></Item>
      </table>
      </>
    );
  }
}

export default SellerDashboard;
