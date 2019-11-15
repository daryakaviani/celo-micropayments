import React, { Component } from "react";
import { Button, Table, Card, Form } from "react-bootstrap";
import "./BuyItem.css";

class BuyItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            proxy: "With Mediator"
        };
    }

    async getItemValue(id) {
        var itemsLength = await this.props.contract.methods.nextItemID().call();
        this.setState({ itemsLength })
        for (var i = 0; i < this.state.itemsLength; i++) {
            var currentItem = await this.props.contract.methods.items(i).call();
            if (currentItem["ID"] == id) {
                return parseInt(currentItem["price"]);
            }
        }
        return 0;
    }

    handleBuyItem = (event) => {
        event.preventDefault();
        var itemID = this.state.value;
        var proxy = this.state.proxy;
        var contract = this.props.contract;
        var account = this.props.account;
        this.getItemValue(this.state.value).then(function (result) {
            if (proxy == "With Mediator") {
                contract.methods.buyItem(itemID, account).send({ from: account, value: parseInt(result) }).then(function (receipt) {
                    console.log(receipt);
                })
            } else {
                contract.methods.buyItem(itemID, -1).send({ from: account, value: parseInt(result) }).then(function (receipt) {
                    console.log(receipt);
                })
            }
        });
    }

    handleValueChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleProxyChange = (event) => {
        this.setState({ proxy: event.target.value });
    }

    render() {
        return (
            <Card>
                <Card.Header>Buy Item</Card.Header>
                <Card.Body>
                    <h3>Buy Item</h3>
                    <Form>
                        <Form.Group controlID="itemID">
                            <Form.Label>Item ID</Form.Label>
                            <Form.Control type="text" placeholder="0" onChange={this.handleValueChange} />
                        </Form.Group>
                        <Form.Group controlID="proxy">
                            <Form.Label>Mediator</Form.Label>
                            <Form.Control as="select" onChange={this.handleProxyChange}>
                                <option>With Mediator</option>
                                <option>Without Mediator</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.handleBuyItem}>
                            Submit
                    </Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default BuyItem;