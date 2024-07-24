package com.example.live_chatting.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // subscribe 메시지 접두사 설정
        registry.enableSimpleBroker("/topic");
        // 클라이언트가 이 경로로 보내면 브로커가 처리하도록 함
        registry.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 웹 소켓 엔드포인트 설정
        registry.addEndpoint("/chatting")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }
}
