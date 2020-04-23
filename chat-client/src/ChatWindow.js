import React, {Component} from "react";
import Conversation from "./Conversation";
import MessageInput from "./MessageInput";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs/esm5/compatibility/stomp";

export default class ChatWindow extends Component {

    stompClient = Stomp.over(new SockJS('http://localhost:8080/chat'));

    constructor(props) {
        super(props);
        this.state = {
            messageHistory: [],
        };

        this.onConnected = this.onConnected.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
    }

    componentDidMount() {
        this.stompClient.connect({}, this.onConnected, this.onError);
    }

    onConnected() {
        this.stompClient.subscribe('/topic/messages', this.receiveMessage);
    }

    receiveMessage(payload) {
        const message = JSON.parse(payload.body);
        const messageHistory = [...this.state.messageHistory, message.messageText];
        this.setState({ messageHistory });
    }

    render() {
        return (
            <div className="chat-window">
                <Conversation messages={this.state.messageHistory}></Conversation>
                <MessageInput stompClient={this.stompClient}></MessageInput>
            </div>
        );
    }
}