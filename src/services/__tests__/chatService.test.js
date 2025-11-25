import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { chatService } from '../chatService';

// Mock do fetch global
global.fetch = vi.fn();

describe('chatService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve fazer requisição POST para a API correta', async () => {
    const mockResponse = { response: 'Test response' };
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse
    });
    
    await chatService.sendMessage('Test message');
    
    expect(global.fetch).toHaveBeenCalledWith(
      'https://hitch-conselheiro-amoroso-production.up.railway.app/chat',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ message: 'Test message' })
      })
    );
  });

  it('deve retornar a resposta da API em caso de sucesso', async () => {
    const mockResponse = { response: 'Hello from API' };
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse
    });
    
    const result = await chatService.sendMessage('Test');
    
    expect(result).toEqual(mockResponse);
  });

  it('deve enviar a mensagem corretamente no body da requisição', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ response: 'OK' })
    });
    
    await chatService.sendMessage('Hello World');
    
    const callArgs = global.fetch.mock.calls[0];
    const body = JSON.parse(callArgs[1].body);
    
    expect(body.message).toBe('Hello World');
  });

  it('deve lançar erro quando a resposta não é ok (status >= 400)', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500
    });
    
    await expect(chatService.sendMessage('Test')).rejects.toThrow('Erro do servidor: 500');
  });

  it('deve tratar erro 404 corretamente', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 404
    });
    
    await expect(chatService.sendMessage('Test')).rejects.toThrow('Erro do servidor: 404');
  });

  it('deve tratar erro 401 corretamente', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 401
    });
    
    await expect(chatService.sendMessage('Test')).rejects.toThrow('Erro do servidor: 401');
  });

  it('deve lançar erro de conexão quando fetch falha', async () => {
    global.fetch.mockRejectedValue(new Error('Failed to fetch'));
    
    await expect(chatService.sendMessage('Test')).rejects.toThrow(
      'Erro de conexão. Verifique sua internet e tente novamente.'
    );
  });

  it('deve lançar erro genérico para outros tipos de erro', async () => {
    global.fetch.mockRejectedValue(new Error('Unknown error'));
    
    await expect(chatService.sendMessage('Test')).rejects.toThrow(
      'Falha na comunicação com o servidor. Tente novamente.'
    );
  });

  it('deve incluir headers corretos na requisição', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ response: 'OK' })
    });
    
    await chatService.sendMessage('Test');
    
    const callArgs = global.fetch.mock.calls[0];
    const headers = callArgs[1].headers;
    
    expect(headers['Content-Type']).toBe('application/json');
    expect(headers['Accept']).toBe('application/json');
  });

  it('deve usar a URL base correta da API', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ response: 'OK' })
    });
    
    await chatService.sendMessage('Test');
    
    const callArgs = global.fetch.mock.calls[0];
    const url = callArgs[0];
    
    expect(url).toBe('https://hitch-conselheiro-amoroso-production.up.railway.app/chat');
  });

  it('deve fazer parsing correto do JSON de resposta', async () => {
    const mockResponse = { 
      response: 'API response',
      metadata: { timestamp: '2024-01-01' }
    };
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse
    });
    
    const result = await chatService.sendMessage('Test');
    
    expect(result).toEqual(mockResponse);
    expect(result.response).toBe('API response');
    expect(result.metadata).toBeDefined();
  });

  it('deve funcionar com mensagens longas', async () => {
    const longMessage = 'A'.repeat(1000);
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ response: 'OK' })
    });
    
    await chatService.sendMessage(longMessage);
    
    const callArgs = global.fetch.mock.calls[0];
    const body = JSON.parse(callArgs[1].body);
    
    expect(body.message).toBe(longMessage);
    expect(body.message.length).toBe(1000);
  });

  it('deve funcionar com caracteres especiais na mensagem', async () => {
    const specialMessage = 'Hello! 😊 How are you? @#$%^&*()';
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ response: 'OK' })
    });
    
    await chatService.sendMessage(specialMessage);
    
    const callArgs = global.fetch.mock.calls[0];
    const body = JSON.parse(callArgs[1].body);
    
    expect(body.message).toBe(specialMessage);
  });

  it('deve tratar timeout de rede (simulado)', async () => {
    global.fetch.mockRejectedValue(new Error('Network timeout'));
    
    await expect(chatService.sendMessage('Test')).rejects.toThrow(
      'Falha na comunicação com o servidor. Tente novamente.'
    );
  });
});
