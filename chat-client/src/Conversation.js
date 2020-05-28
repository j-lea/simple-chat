import React, { Component } from 'react';
import type {ChatMessage} from "./ChatWindow";

export default class Conversation extends Component {

    constructor(props) {
        super(props);
    }

    getMessages = () => {
        return this.props.messages.map(
            (message: ChatMessage) =>
                <div className="message" key={Math.random()}>
                    <p className="message-text">{message.messageText}</p>
                    <p className="sender">{message.senderName}</p>
                </div>);
    }

    render() {
        return (
            <div className="conversation">
                {this.getMessages()}
            </div>
        )
    }
}