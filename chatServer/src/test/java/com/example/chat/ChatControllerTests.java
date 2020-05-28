package com.example.chat;

import com.example.chat.model.ChatMessage;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.*;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;

import static java.util.concurrent.TimeUnit.SECONDS;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ChatControllerTests {

    private static final String SEND_MESSAGE_ENDPOINT = "/app/chat.sendMessage";
    private static final String SUBSCRIBE_MESSAGE_ENDPOINT = "/topic/messages";

    @Value("${local.server.port}")
    private int port;

    private CompletableFuture<ChatMessage> messageFuture;

    @Before
    public void Setup() {
        messageFuture = new CompletableFuture<>();
    }

    @Test
    public void SendMessageBroadcastsTheExactMessageToTopicMessages() throws InterruptedException, ExecutionException, TimeoutException {
        String url = "ws://localhost:" + port + "/ws";
        StompSessionHandler sessionHandler = new StompSessionHandlerAdapter() {};
        StompSession session = createStompClient().connect(url, sessionHandler).get();

        session.subscribe(SUBSCRIBE_MESSAGE_ENDPOINT, new ChatMessageStompFrameHandler());
        session.send(SEND_MESSAGE_ENDPOINT, new ChatMessage("This is my message", "Jenny504"));

        ChatMessage receivedMessage = messageFuture.get(3, SECONDS);

        assertNotNull(receivedMessage);
        assertEquals("This is my message", receivedMessage.getMessageText());
        assertEquals("Jenny504", receivedMessage.getSenderName());
    }

    private WebSocketStompClient createStompClient() {
        List<Transport> transports = new ArrayList<Transport>();
        transports.add(new WebSocketTransport(new StandardWebSocketClient()));

        SockJsClient sockJsClient = new SockJsClient(transports);
        WebSocketStompClient stompClient = new WebSocketStompClient(sockJsClient);
        stompClient.setMessageConverter(new MappingJackson2MessageConverter());

        return stompClient;
    }

    private class ChatMessageStompFrameHandler implements StompFrameHandler {
        @Override
        public Type getPayloadType(StompHeaders stompHeaders) {
            return ChatMessage.class;
        }

        @Override
        public void handleFrame(StompHeaders stompHeaders, Object o) {
            ChatMessage receivedMessage = (ChatMessage) o;
            messageFuture.complete(receivedMessage);
        }
    }
}
