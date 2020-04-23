import React, { Component } from 'react';

export default class Conversation extends Component {

    props = {};

    constructor(props) {
        super(props);
        this.props = props;

        this.getMessages = this.getMessages.bind(this);
    }

    getMessages() {
        return this.props.messages.map(
            (message) => <div className="message" key={Math.random()}>{message}</div>);
    }

    render() {
        return (
            <div className="conversation">
                {this.getMessages()}
            </div>
        )
    }
}