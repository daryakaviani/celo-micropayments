import React, { Component } from 'react';
import "./NewItem.css";
import { Button } from "react-bootstrap"
import axios from 'axios';
var moment = require('moment');
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

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

class Address extends Component {
    constructor(props) {
        super(props);
        this.state = { address: '...' };
    }

    componentDidMount() {
        axios.get('/user/' + this.props.address).then(res => {
            this.setState({ address: res.data || this.props.address });
        }).catch(e => {
            this.setState({ address: e.toString() });
        });
    }

    render() {
        return <span>{this.state.address}</span>
    }
}

class NewItem extends Component {
    constructor(props) {
        super(props);
    }

    handleClaimNonreceived = (event) => {
        event.preventDefault();
        this.props.setClaimReceivedStatus(false).then(() => alert('submitted!'));
    }

    handleRecieved = (event) => {
        event.preventDefault();
        this.props.setClaimReceivedStatus(true).then(() => alert('submitted!'));
    }

    handleSellerChallenge = (event) => {
        event.preventDefault();
        this.props.sellerChallenge(true).then(() => alert('challenged!'));
    }

    handleSellerAccept = (event) => {
        event.preventDefault();
        this.props.sellerChallenge(false).then(() => alert("accepted!"))
    }

    handleSellerRedeem = (e) => {
        e.preventDefault();
        this.props.sellerRedeem(this.props.item["ID"]).then(alert("Money has been redeemed"));
    }

    sellingCode = () => {
        var deadline = moment.unix(this.props.item["buyTime"]);
        deadline.add(30, "seconds");
        return (
            <tr className="item">
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
                <td>
                    {this.props.item["ID"]}
                </td>
                <td>
                    {this.props.item["price"] / 0.0072 / (10 ** 18)}
                </td>
                <td>
                    {this.props.item.hasBuyer ? <Address address={this.props.item["buyerAddress"]} /> : 'None yet'}
                </td>
                <td>
                    {this.props.item.hasBuyer ? deadline.format("ll") : null}
                </td>
                <td style={{ textAlign: "center" }}>
                    {this.props.item.hasBuyer ? (this.props.item.claimNonreceived ? (this.props.item.challengeNonreceived ? "Challenged" : < React.Fragment > <Button variant="darker-green" onClick={this.handleSellerChallenge}>Challenge</Button> &nbsp;<Button variant="darker-green" onClick={this.handleSellerAccept}>Accept</Button></React.Fragment>) : "Not Challenged") : null}
                </td>
            </tr >)
    }

    soldCode = () => {
        var item_sold = moment.unix(this.props.item["buyTime"]);
        return (
            <tr className="item">
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
                <td>
                    {this.props.item["ID"]}
                </td>
                <td>
                    {this.props.item["price"] / 0.0072 / (10 ** 18)}
                </td>
                <td>
                    <Address address={this.props.item["buyerAddress"]} />
                </td>
                <td>
                    {item_sold.format("ll")}
                </td>
                <td>
                    {this.props.item["challengeWinner"] != ZERO_ADDRESS ? <React.Fragment>Challenge related, Winner: <Address address={this.props.item["challengeWinner"]} /> </React.Fragment> : "Normal"}
                </td>
                <td>
                    {this.props.item["challengeWinner"] == this.props.item["sellerAddress"] || this.props.item["challengeWinner"] == ZERO_ADDRESS ? <Button onClick={this.handleSellerRedeem} variant="darker-green">Redeem Amount</Button> : null}
                </td>

            </tr>)
    }

    boughtCode = () => {
        var bought_time = moment.unix(this.props.item["buyTime"]);
        return (
            <tr className="item">
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
                <td>
                    {this.props.item["ID"]}
                </td>
                <td>
                    {this.props.item["price"] / 0.0072 / (10 ** 18)}
                </td>
                <td>
                    <Address address={this.props.item["sellerAddress"]} />
                </td>
                <td>
                    {bought_time.format("ll")}
                </td>
                {this.props.item["challengeWinner"] != ZERO_ADDRESS ? <td>Challenge related, Winner: <Address address={this.props.item["challengeWinner"]} /></td> : ""}
            </tr>
        )
    }

    buyingCode = () => {
        var deadline = moment.unix(this.props.item["buyTime"]);
        deadline.add(30, "seconds");
        return (
            <tr className="item">
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
                <td>
                    {this.props.item["ID"]}
                </td>
                <td>
                    {this.props.item["price"] / 0.0072 / (10 ** 18)}
                </td>
                <td>
                    <Address address={this.props.item["sellerAddress"]} />
                </td>
                <td>
                    {deadline.format("ll")}
                </td>

                <td style={{ textAlign: "center" }}>
                    {this.props.item["claimNonreceived"] == true ? "Claimed non received" :
                        <React.Fragment>
                            <Button variant="darker-green" onClick={this.handleClaimNonreceived} >Claim Nonrecieved</Button>
                            &nbsp;
                            <Button variant="lighter-green" onClick={this.handleRecieved} >Recieved</Button>
                        </React.Fragment>}

                </td>
            </tr>
        )
    }

    render() {

        if (this.props.type === "selling") {
            return this.sellingCode();
        }
        if (this.props.type === "sold") {
            return this.soldCode();
        }
        if (this.props.type === "buying") {
            return this.buyingCode();
        }
        if (this.props.type === "bought") {
            return this.boughtCode();
        }
    }
}

export default NewItem;
