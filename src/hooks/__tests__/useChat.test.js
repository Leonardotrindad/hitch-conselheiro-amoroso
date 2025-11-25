import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useChat } from '../useChat';
import { chatService } from '../../services/chatService';

// Mock do chatService
vi.mock('../../services/chatService', () => ({
  chatService: {
    sendMessage: vi.fn()
  }
}));

describe('useChat Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve inicializar com estado vazio', () => {
    const { result } = renderHook(() => useChat());
    
    expect(result.current.messages).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('deve ter a função sendMessage disponível', () => {
    const { result } = renderHook(() => useChat());
    
    expect(typeof result.current.sendMessage).toBe('function');
  });

  it('deve ter a função clearMessages disponível', () => {
    const { result } = renderHook(() => useChat());
    
    expect(typeof result.current.clearMessages).toBe('function');
  });

  it('deve adicionar mensagem do usuário ao enviar', async () => {
    chatService.sendMessage.mockResolvedValue({ response: 'Bot response' });
    
    const { result } = renderHook(() => useChat());
    
    await act(async () => {
      await result.current.sendMessage('Hello');
    });
    
    await waitFor(() => {
      const userMessage = result.current.messages.find(msg => msg.sender === 'user');
      expect(userMessage).toBeDefined();
      expect(userMessage.text).toBe('Hello');
    });
  });

  it('deve adicionar mensagem do bot após resposta da API', async () => {
    chatService.sendMessage.mockResolvedValue({ response: 'Bot response' });
    
    const { result } = renderHook(() => useChat());
    
    await act(async () => {
      await result.current.sendMessage('Hello');
    });
    
    await waitFor(() => {
      const botMessage = result.current.messages.find(msg => msg.sender === 'hitch');
      expect(botMessage).toBeDefined();
      expect(botMessage.text).toBe('Bot response');
    });
  });

  it('deve definir isLoading como true durante o envio', async () => {
    chatService.sendMessage.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ response: 'Response' }), 100))
    );
    
    const { result } = renderHook(() => useChat());
    
    act(() => {
      result.current.sendMessage('Test');
    });
    
    expect(result.current.isLoading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('deve tratar erros da API corretamente', async () => {
    const errorMessage = 'API Error';
    chatService.sendMessage.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useChat());
    
    await act(async () => {
      await result.current.sendMessage('Test');
    });
    
    await waitFor(() => {
      expect(result.current.error).toBe(errorMessage);
    });
  });

  it('deve adicionar mensagem de erro quando a API falha', async () => {
    chatService.sendMessage.mockRejectedValue(new Error('API Error'));
    
    const { result } = renderHook(() => useChat());
    
    await act(async () => {
      await result.current.sendMessage('Test');
    });
    
    await waitFor(() => {
      const errorMessage = result.current.messages.find(
        msg => msg.text === 'Desculpe, ocorreu um erro. Tente novamente.'
      );
      expect(errorMessage).toBeDefined();
      expect(errorMessage.isError).toBe(true);
    });
  });

  it('não deve enviar mensagens vazias ou apenas com espaços', async () => {
    const { result } = renderHook(() => useChat());
    
    await act(async () => {
      await result.current.sendMessage('   ');
    });
    
    expect(chatService.sendMessage).not.toHaveBeenCalled();
    expect(result.current.messages).toEqual([]);
  });

  it('deve limpar mensagens ao chamar clearMessages', async () => {
    chatService.sendMessage.mockResolvedValue({ response: 'Bot response' });
    
    const { result } = renderHook(() => useChat());
    
    await act(async () => {
      await result.current.sendMessage('Test');
    });
    
    await waitFor(() => {
      expect(result.current.messages.length).toBeGreaterThan(0);
    });
    
    act(() => {
      result.current.clearMessages();
    });
    
    expect(result.current.messages).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it('deve incluir timestamp nas mensagens', async () => {
    chatService.sendMessage.mockResolvedValue({ response: 'Bot response' });
    
    const { result } = renderHook(() => useChat());
    
    await act(async () => {
      await result.current.sendMessage('Test');
    });
    
    await waitFor(() => {
      const userMessage = result.current.messages.find(msg => msg.sender === 'user');
      expect(userMessage.timestamp).toBeDefined();
      expect(typeof userMessage.timestamp).toBe('string');
    });
  });

  it('deve incluir IDs únicos nas mensagens', async () => {
    chatService.sendMessage.mockResolvedValue({ response: 'Bot response' });
    
    const { result } = renderHook(() => useChat());
    
    await act(async () => {
      await result.current.sendMessage('Test 1');
      await result.current.sendMessage('Test 2');
    });
    
    await waitFor(() => {
      const ids = result.current.messages.map(msg => msg.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  it('deve limpar o erro ao enviar nova mensagem', async () => {
    chatService.sendMessage.mockRejectedValueOnce(new Error('First error'));
    
    const { result } = renderHook(() => useChat());
    
    await act(async () => {
      await result.current.sendMessage('Test 1');
    });
    
    await waitFor(() => {
      expect(result.current.error).toBe('First error');
    });
    
    chatService.sendMessage.mockResolvedValueOnce({ response: 'Success' });
    
    await act(async () => {
      await result.current.sendMessage('Test 2');
    });
    
    await waitFor(() => {
      expect(result.current.error).toBe(null);
    });
  });
});
