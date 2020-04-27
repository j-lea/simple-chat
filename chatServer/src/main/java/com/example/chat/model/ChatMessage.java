package com.example.chat.model;

import com.fasterxml.jackson.annotation.*;

public class ChatMessage {

    @JsonProperty("messageText")
    private final String messageText;

    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
    public ChatMessage(@JsonProperty("messageText") String messageText) {
        this.messageText = messageText;
    }


    public String getMessageText() {
        return messageText;
    }
}
