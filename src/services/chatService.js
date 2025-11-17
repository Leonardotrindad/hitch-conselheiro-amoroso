// Serviço para comunicação com a API do backend
const API_BASE_URL = '/api';

export const chatService = {

  async sendMessage(message) {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      throw new Error('Falha na comunicação com o servidor. Tente novamente.');
    }
  }
};

export default chatService;
