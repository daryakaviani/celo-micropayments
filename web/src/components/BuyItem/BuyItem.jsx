import React, { Component } from "react";
import { Card, Form } from "react-bootstrap";
import SpinnerButton from "../SpinnerButton/SpinnerButton";
import "./BuyItem.css";

class BuyItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            proxy: "With Mediator",
        };
    }

    handleBuyItem = (event) => {
        event.preventDefault();
        var value = this.state.value;
        var proxy = this.state.proxy;

        return this.props.buyItem(Number(value), proxy === "With Mediator")
                   .then((receipt) => console.log(receipt))
                   .catch((e) => alert(e.toString()));
    }

    handleValueChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleProxyChange = (event) => {
        this.setState({ proxy: event.target.value });
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
                <Card.Header>Buy Item</Card.Header>
                <Card.Body>
                    <h3>Buy Item</h3>
                    <Form>
                        <Form.Group controlId="itemID">
                            <Form.Label style={{ color: "white" }}>Item ID</Form.Label>
                            <Form.Control type="text" placeholder="0" onChange={this.handleValueChange} />
                        </Form.Group>
                        <Form.Group controlId="proxy">
                            <Form.Label style={{ color: "white" }}>Mediator</Form.Label>
                            <Form.Control style={{ color: "black" }} as="select" onChange={this.handleProxyChange}>
                                <option>With Mediator</option>
                                <option>Without Mediator</option>
                            </Form.Control>
                        </Form.Group>
                        <SpinnerButton variant="darker-green" type="submit" onClick={this.handleBuyItem}>
                            Submit
                        </SpinnerButton>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default BuyItem;
