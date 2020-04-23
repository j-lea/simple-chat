import React, { Component } from 'react';

export default class Conversation extends Component {

    constructor(props) {
        super(props);
    }

    getMessages = () => {
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