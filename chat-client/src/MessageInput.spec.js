import React from 'react';
import { mount } from 'enzyme';
import MessageInput from "./MessageInput";

const mockSend = jest.fn();

describe('MessageInput', () => {

    beforeEach(() => {
        mockSend.mockClear();
    });

    it('has a text input', () => {
        const wrapper = mount(<MessageInput/>);
        const messageInput = wrapper.find('input[name="message"]');
        expect(messageInput.exists()).toBeTruthy();
    });

    it('has a send button', () => {
        const wrapper = mount(<MessageInput/>);
        const sendButton = wrapper.find('button[type="submit"]');
        expect(sendButton.exists()).toBeTruthy();
        expect(sendButton.text()).toEqual('Send');
    });

    it('sends the message when send is pressed', () => {
        const wrapper = mount(<MessageInput sendMessage={mockSend}/>);

        sendMessage(wrapper, 'This is my message');

        expect(mockSend).toHaveBeenCalledTimes(1);
        expect(mockSend).toHaveBeenCalledWith('This is my message');
    });

    it('clears the message box after the message has been sent', () => {
        const wrapper = mount(<MessageInput sendMessage={mockSend}/>);

        sendMessage(wrapper, 'Beep boop');

        const messageInput = wrapper.find('input[name="message"]');
        expect(messageInput.props('value').value).toEqual('');
    });

    function sendMessage(wrapper, messageText) {
        const messageInput = wrapper.find('input[name="message"]');
        messageInput.simulate('change', { target: { value: messageText}})

        const sendButton = wrapper.find('button[type="submit"]');
        sendButton.simulate('submit');
    }
});