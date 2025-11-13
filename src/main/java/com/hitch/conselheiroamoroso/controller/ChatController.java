package com.hitch.conselheiroamoroso.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class ChatController {

    private final ChatClient chatClient;

    public ChatController(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody Map<String, String> request) {
        String input = request.get("message");

        String response = chatClient.prompt()
                .user(input)
                .call()
                .content();

        return Map.of("response", response);
    }
}
