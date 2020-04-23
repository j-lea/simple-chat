package com.example.chat.model;

import com.fasterxml.jackson.annotation.*;

public class ChatMessage {
//    public enum MessageType {
//        CHAT,
//        JOIN,
//        LEAVE
//    }

//    private final MessageType type;
    @JsonProperty("messageText")
    private final String messageText;
//    private final String sender;

    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
    public ChatMessage(String messageText) {
        this.messageText = messageText;
    }

//    public ChatMessage(MessageType type, String content, String sender) {
//        this.type = type;
//        this.messageText = content;
//        this.sender = sender;
//    }

//    public MessageType getType() {
//        return type;
//    }

    public String getMessageText() {
        return messageText;
    }

    //    public String getSender() {
//        return sender;
//    }
}
