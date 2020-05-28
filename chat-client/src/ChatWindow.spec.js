import React from 'react';
import ChatWindow from './ChatWindow';
import {mount} from "enzyme";
import {Stomp} from '@stomp/stompjs/esm5/compatibility/stomp';
import type {ChatMessage} from "./ChatWindow";

jest.mock('sockjs-client');
jest.mock('@stomp/stompjs/esm5/compatibility/stomp');

describe('ChatWindow', () => {

    let mockClient;
    let clientSpy;

    beforeEach(() => {
        mockClient = {
            connect: jest.fn(),
            subscribe: jest.fn(),
            send: jest.fn()
        };

        clientSpy = jest.spyOn(Stomp, 'over').mockImplementation(() => mockClient);
    })

    afterEach(() => {
        clientSpy.mockRestore();
    })

    it('pops up asking for a username on render', () => {
        const wrapper = mount(<ChatWindow/>);

        const registrationBox = wrapper.find('.register');

        expect(registrationBox.find('label').text()).toEqual('Please enter a username');
        expect(registrationBox.find('input[name="username"]').exists()).toBeTruthy();
        expect(registrationBox.find('button[type="submit"]').exists()).toBeTruthy();
    });

    it('entering a username makes the register box disappear', () => {
        const wrapper = mount(<ChatWindow/>);

        expect(wrapper.find('.register').exists()).toBeTruthy();
        const usernameInput = wrapper.find('.register input[name="username"]');

        usernameInput.simulate('change', { target: { value: 'Jenny123'}});

        const saveButton = wrapper.find('.register button[type="submit"]');
        saveButton.simulate('submit');

        expect(wrapper.find('.register').exists()).toBeFalsy();
    });

    it('sends messages with that username', () => {
        const wrapper = mount(<ChatWindow username='Jenny123'/>);

        wrapper.find('MessageInput').prop('sendMessage')('Hello');

        const expectedMessage: ChatMessage = {
            senderName: 'Jenny123',
            messageText: 'Hello',
        };

        expect(mockClient.send).toHaveBeenCalledWith("/app/chat.sendMessage", {}, JSON.stringify(expectedMessage));
    });

    it('does something when it receives messages', () => {
        // TODO: test that it does the right thing when receiving messages
    });
});