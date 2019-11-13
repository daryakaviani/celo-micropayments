import React, { Component } from 'react';
import "./NewItem.css";
import { Button } from "react-bootstrap"
var moment = require('moment');

/*
ID: "1"
buyTime: "0" <-- Time
buyerAddress: "0x0000000000000000000000000000000000000000"
challengeNonreceived: false
challengeTime: "0" <-- Time
challengeWinner: "0x0000000000000000000000000000000000000000"
claimNonreceived: false
mediatorAddress: "0x0000000000000000000000000000000000000000"
price: "200"
received: false
sellerAcceptNonReceived: false
sellerAcceptTime: "0" <-- Time 
sellerAddress: "0xCCe64bAe8A291ca6dF731F1C62e85C28D7881911"
*/

class NewItem extends Component {
    constructor(props) {
        super(props);
    }

    handleClaimNonreceived = (event) => {
        event.preventDefault();
        this.props.contract.methods.buyerClaimsNonReceived(this.props.item.ID).send({ from: this.props.account }).then(function (reciept) { console.log(reciept) });
    }

    handleRecieved = (event) => {
        event.preventDefault();
        this.props.contract.methods.buyerConfirmsReceived(this.props.item.ID).send({ from: this.props.account }).then(function (reciept) { console.log(reciept) });
    }

    sellingCode = () => {
        var deadline = moment.unix(this.props.item["buyTime"]);
        deadline.add(2, "weeks");
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
                    {(this.props.item["buyerAddress"] != "0x0000000000000000000000000000000000000000") ? deadline.format("ll") : null}
                </td>
                <td>
                    {(this.props.item["buyerAddress"] != "0x0000000000000000000000000000000000000000") ? (this.props.item["claimNonreceieved"] ? "Challenged" : "Not Challenged") : null}
                </td>
                {this.props.item["claimNonrecieved"] ? <td><Button>Challenge</Button></td> : null}
            </tr>)
    }

    soldCode = () => {
        var item_sold = moment.unix(this.props.item["buyTime"]);
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
                    {item_sold.format("ll")}
                </td>
            </tr>)
    }

    boughtCode = () => {
        var bought_time = moment.unix(this.props.item["buyTime"]);
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
                    {bought_time.format("ll")}
                </td>
            </tr>
        )
    }

    buyingCode = () => {
        var deadline = moment.unix(this.props.item["buyTime"]);
        deadline.add(2, "weeks");
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
                    {deadline.format("ll")}
                </td>
                <td>
                    <Button onClick={this.handleClaimNonreceived} >Claim Nonrecieved</Button>
                    &nbsp;
                    <Button onClick={this.handleRecieved} >Recieved</Button>
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