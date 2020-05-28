package com.example.chat.model;

import com.fasterxml.jackson.annotation.*;

public class ChatMessage {

    @JsonProperty("messageText")
    private final String messageText;

	@JsonProperty("senderName")
	private final String senderName;

    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
    public ChatMessage(@JsonProperty("messageText") String messageText, @JsonProperty("senderName") String senderName) {
        this.messageText = messageText;
        this.senderName = senderName;
    }

    public String getMessageText() {
        return messageText;
    }

	public String getSenderName() {
		return senderName;
	}
}
