import React, { Component } from 'react';
import "./NewItem.css";
import { Button } from "react-bootstrap"

/*
ID: "1"
buyTime: "0"
buyerAddress: "0x0000000000000000000000000000000000000000"
challengeNonreceived: false
challengeTime: "0"
challengeWinner: "0x0000000000000000000000000000000000000000"
claimNonreceived: false
mediatorAddress: "0x0000000000000000000000000000000000000000"
price: "200"
received: false
sellerAcceptNonReceived: false
sellerAcceptTime: "0"
sellerAddress: "0xCCe64bAe8A291ca6dF731F1C62e85C28D7881911"
*/

class NewItem extends Component {
    constructor(props) {
        super(props);
    }

    sellingCode = () => {
        return (
            <tr className="item">
                <td>
                    {this.props.item["ID"]}
                </td>
                <td>
                    {this.props.item["price"]}
                </td>
                <td>
                    {this.props.item["buyerAddress"]}
                </td>
                <td>
                    {this.props.item["claimNonreceieved"] ? "Challenged" : "Not Challenged"}
                </td>
                {this.props.item["claimNonrecieved"] ? <td><Button>Challenge</Button></td> : null}
            </tr>)
    }

    soldCode = () => {
        return (
            <tr className="item">
                <td>
                    {this.props.item["ID"]}
                </td>
                <td>
                    {this.props.item["price"]}
                </td>
                <td>
                    {this.props.item["buyerAddress"]}
                </td>
            </tr>)
    }

    boughtCode = () => {
        return (
            <tr className="item">
                <td>
                    {this.props.item["ID"]}
                </td>
                <td>
                    {this.props.item["price"]}
                </td>
                <td>
                    {this.props.item["buyerAddress"]}
                </td>
            </tr>
        )
    }

    buyingCode = () => {
        return (
            <tr className="item">
                <td>
                    {this.props.item["ID"]}
                </td>
                <td>
                    {this.props.item["price"]}
                </td>
                <td>
                    {this.props.item["sellerAddress"]}
                </td>
                <td>
                    <Button>Challenge</Button>
                    &nbsp;
                    <Button>Recieved</Button>
                </td>
            </tr>
        )
    }

    render() {
        if (this.props.type == "selling") {
            return this.sellingCode();
        }
        if (this.props.type == "sold") {
            return this.soldCode();
        }
        if (this.props.type == "buying") {
            return this.buyingCode();
        }
        if (this.props.type == "bought") {
            return this.boughtCode();
        }
    }
}

export default NewItem;