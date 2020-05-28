import React from 'react';
import { mount } from 'enzyme';
import Conversation from "./Conversation";
import type {ChatMessage} from "./ChatWindow";

describe('Conversation', () => {

    it('lists all the messages provided', () => {
        const messageProps = [
            createMessage('me', 'Hi'),
            createMessage('you', 'Hello'),
            createMessage('me','How are you?')
        ];

        const wrapper = mount(<Conversation messages={messageProps}></Conversation>);

        const messages = wrapper.find('.message');

        expect(messages.at(0).children().find('.message-text').text()).toEqual(messageProps[0].messageText);
        expect(messages.at(1).children().find('.message-text').text()).toEqual(messageProps[1].messageText);
        expect(messages.at(2).children().find('.message-text').text()).toEqual(messageProps[2].messageText);
    });


    it('shows the sender name underneath each message', () => {
        const messageProps = [
            createMessage('me', 'Hi'),
            createMessage('you', 'Hello'),
            createMessage('me','How are you?')
        ];

        const wrapper = mount(<Conversation messages={messageProps}></Conversation>);

        const messages = wrapper.find('.message');

        expect(messages.at(0).children().find('.sender').text()).toEqual(messageProps[0].senderName);
        expect(messages.at(1).children().find('.sender').text()).toEqual(messageProps[1].senderName);
        expect(messages.at(2).children().find('.sender').text()).toEqual(messageProps[2].senderName);
    });

    function createMessage(senderName: string, messageText: string): ChatMessage {
        return {
            senderName,
            messageText
        }
    }
});