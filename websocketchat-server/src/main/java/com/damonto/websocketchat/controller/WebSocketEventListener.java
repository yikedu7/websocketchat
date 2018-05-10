package com.damonto.websocketchat.controller;

import com.damonto.websocketchat.model.ChatMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    @Autowired
    SimpMessageSendingOperations operations;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        logger.info("New User Connected!");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {

        SimpMessageHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        /* 在 session 中获取 username */
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        if (null != username) {

            logger.info("User Disconnected: " + username);

            ChatMessage message = new ChatMessage();
            message.setSender(username);
            message.setType(ChatMessage.MessageType.LEAVE);

            operations.convertAndSend("/topic/public", message);
        }
    }

}
