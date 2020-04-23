import React, { Component } from 'react';

export default class MessageInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageText: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ messageText: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.sendMessage(this.state.messageText);
        this.setState({
            messageText: '',
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="message" value={this.state.messageText} onChange={this.handleChange}/>
                <button type="submit" name="send" value="Send">Send</button>
            </form>
        )
    }
}