package com.example.chat.controller;

import com.example.chat.model.ChatMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

public class WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        logger.info("Received a new websocket connection");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        String username = headerAccessor.getSessionAttributes().get("username").toString();

        if (username != null) {
            logger.info(String.format("Disconnected user: %s", username));

//            ChatMessage chatMessage = new ChatMessage("");
//            ChatMessage chatMessage = new ChatMessage(ChatMessage.MessageType.LEAVE, "", username);

//            messagingTemplate.convertAndSend("/topic/public", null);
        }
    }
}
