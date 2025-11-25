import { useState, useCallback } from 'react';
import { chatService } from '../services/chatService';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: (globalThis.crypto?.randomUUID?.() || `${Date.now()}-user-${Math.random()}`),
      text: messageText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await chatService.sendMessage(messageText);
      
      const botMessage = {
        id: (globalThis.crypto?.randomUUID?.() || `${Date.now()}-bot-${Math.random()}`),
        text: response.response,
        sender: 'hitch',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError(err.message);
      
      const errorMessage = {
        id: (globalThis.crypto?.randomUUID?.() || `${Date.now()}-error-${Math.random()}`),
        text: 'Desculpe, ocorreu um erro. Tente novamente.',
        sender: 'hitch',
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages
  };
};
