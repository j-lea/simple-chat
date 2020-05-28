import React, {Component} from "react";
import Conversation from "./Conversation";
import MessageInput from "./MessageInput";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs/esm5/compatibility/stomp";

export type ChatMessage = {
    senderName: String,
    messageText: String
}

export default class ChatWindow extends Component {

    stompClient = Stomp.over(new SockJS('http://localhost:8080/ws'));

    constructor(props) {
        super(props);
        this.state = {
            messageHistory: [],
            username: props.username,
            usernameValid: !!props.username,
        };
    }

    componentDidMount() {
        this.stompClient.connect({}, this.onConnected, this.onError);
    }

    onConnected = () => {
        this.stompClient.subscribe('/topic/messages', this.receiveMessage);
    }

    sendMessage = (messageText: string) => {
        const message: ChatMessage = {
            senderName: this.state.username,
            messageText: messageText
        };

        this.stompClient.send(
            "/app/chat.sendMessage",
            {},
            JSON.stringify(message)
        );
    }

    saveUsername = (event: Event) => {
        event.preventDefault();
        this.setState({usernameValid: true});
    }

    handleChange = (event) => {
        this.setState({ username: event.target.value});
    }

    receiveMessage = (payload) => {
        const message: ChatMessage = JSON.parse(payload.body);
        const messageHistory = [...this.state.messageHistory, message];
        this.setState({ messageHistory });
    }

    render() {
        return (
            <div className="chat-window">
                {!this.state.usernameValid &&
                    <form className='register' onSubmit={this.saveUsername}>
                        <label>Please enter a username</label>
                        <input
                            type='text'
                            name='username'
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        <button type='submit'>Save</button>
                    </form>
                }
                <Conversation messages={this.state.messageHistory}></Conversation>
                <MessageInput sendMessage={this.sendMessage}></MessageInput>
            </div>
        );
    }
}