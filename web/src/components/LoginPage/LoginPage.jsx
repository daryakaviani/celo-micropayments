import React, { Component } from 'react';
import { Button, Form, Navbar } from "react-bootstrap";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validNames: ["admin", "other_admin"],
            validPasswords: ["admin", "other_admin"],
            currentUsername: "",
            currentPassword: "",
            redirect: false,
        }
    }

    tempHandleSubmit = () => {
        this.props.history.replace({
            pathname: "/UserDashboard",
            state: {
                userId: this.state.validNames[0]
            }
        })
    }

    handleSubmit = () => {
        var correctPassword;
        var currentIndex;
        for (var i = 0; i < this.state.validNames.length; i++) {
            if (this.state.validNames[i] == this.state.currentUsername) {
                correctPassword = this.state.validPasswords[i];
                currentIndex = i;
                break;
            }
        }
        console.log(correctPassword)
        if (correctPassword && this.state.currentPassword == correctPassword) {
            this.props.history.replace({
                pathname: "/UserDashboard",
                state: {
                    userId: this.state.validNames[currentIndex]
                }
            })
        }
    }

    handleUserNameInput = (event) => {
        this.setState({ currentUsername: event.target.value });
    }

    handlePasswordInpit = (event) => {
        this.setState({ currentPassword: event.target.value });
    }

    render() {
        if (this.redirect == true) {

        }
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src="../../logo.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        {" React Bootstrap"}
                    </Navbar.Brand>
                </Navbar>
                <br></br>
                <h1 className="text-center">Login</h1>
                <div className="container">
                    <Form>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" onChange={this.handleUserNameInput} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordInpit} />
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default LoginPage;