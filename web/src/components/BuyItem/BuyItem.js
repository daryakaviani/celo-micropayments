import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./BuyItem.css";

class BuyItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Add state here
      items: [
          {proxy: false}
      ]
    };
  }

  renderProxy = () => {
      this.proxy = true
  }

  render() {
    return( 
        <>
        <header>
            Buy Item
        </header>
        <Form>
            <Form.Group controlID="itemToBuy">
                <Form.Label>Item Name</Form.Label>
                <Form.Control type="text" placeholder="Potatoes" />
            </Form.Group>
            <Form.Group controlID="itemID">
                <Form.Label>Item ID</Form.Label>
                <Form.Control type="text" placeholder="1234" />
            </Form.Group>
            <Form.Group controlID="proxy">
                <Form.Label>Proxy</Form.Label>
                <Form.Control as="select">
                    <option>With Proxy</option>
                    <option>Without Proxy</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </>
    );
  }
}

export default BuyItem;