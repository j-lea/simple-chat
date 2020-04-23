import React from 'react';
import { mount } from 'enzyme';
import Conversation from "./Conversation";

describe('Conversation', () => {

    it('lists all the messages provided', () => {
        const messageProps = ['Hi', 'Hello', 'How are you?'];
        const wrapper = mount(<Conversation messages={messageProps}></Conversation>);

        const messages = wrapper.find('.message');

        expect(messages.at(0).text()).toEqual(messageProps[0])
        expect(messages.at(1).text()).toEqual(messageProps[1])
        expect(messages.at(2).text()).toEqual(messageProps[2])
    });
});