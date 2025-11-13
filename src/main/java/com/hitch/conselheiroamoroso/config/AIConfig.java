package com.hitch.conselheiroamoroso.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AIConfig {

    private final ChatMemory chatMemory = MessageWindowChatMemory.builder().build();

    @Bean
    ChatClient chatClient(ChatClient.Builder builder) {
        return builder
                .defaultAdvisors(MessageChatMemoryAdvisor.builder(chatMemory).build())
                .defaultSystem("Você é o \"Conselheiro Amoroso\", um assistente de IA com empatia,\n" +
                        "    sabedoria e especialidade em relacionamentos amorosos. Seu tom é calmo, \n" +
                        "    acolhedor e compreensivo.\n" +
                        "\n")
                .build();
    }

}
