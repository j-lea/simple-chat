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
    }

    componentDidMount() {
        this.stompClient.connect({}, this.onConnected, this.onError);
    }

    onConnected = () => {
        this.stompClient.subscribe('/topic/messages', this.receiveMessage);
    }

    sendMessage = (messageText) => {
        this.stompClient.send(
            "/app/chat.sendMessage",
            {},
            JSON.stringify({ messageText: messageText })
        );
    }

    receiveMessage = (payload) => {
        const message = JSON.parse(payload.body);
        const messageHistory = [...this.state.messageHistory, message.messageText];
        this.setState({ messageHistory });
    }

    render() {
        return (
            <div className="chat-window">
                <Conversation messages={this.state.messageHistory}></Conversation>
                <MessageInput sendMessage={this.sendMessage}></MessageInput>
            </div>
        );
    }
}