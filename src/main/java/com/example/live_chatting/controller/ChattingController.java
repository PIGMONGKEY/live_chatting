package com.example.live_chatting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class ChattingController {

    // 메시지 전송
    // 구독하는 모든 사람에게 보내기
    @MessageMapping("/message/send/{roomId}")
    @SendTo("/topic/message/send/{roomId}")
    public String sendMessage(@Payload String message, @DestinationVariable("roomId") String roomId) {
        return message;
    }
}
