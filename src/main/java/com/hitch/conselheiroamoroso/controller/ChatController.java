package com.hitch.conselheiroamoroso.controller;

import com.hitch.conselheiroamoroso.service.ChatService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody Map<String, String> request) {
        String message = request.get("message");
        String response = chatService.getResponse(message);

        return Map.of("response", response);
    }

}
