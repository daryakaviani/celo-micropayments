import React, { Component } from "react";
import { Button, Spinner } from "react-bootstrap";

class SpinnerButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.buttonProps = {
            ...props,
            onClick: e => this.handleClick(e)
        }
    }

    handleClick(event) {
        this.props.onClick(event)
            .catch(e => console.error(e))
            .then(() => this.setState({ loading: false }));
        this.setState({ loading: true });
    }

    render() {
        return (
            <Button {...this.buttonProps}>
                {this.state.loading && <span><Spinner
                                                 as="span"
                                                 animation="border"
                                                 size="sm"
                                                 role="status"
                                                 aria-hidden="true"
                    />&nbsp;</span>}
                            {this.props.children}
            </Button>
        );
    }
}

export default SpinnerButton;
