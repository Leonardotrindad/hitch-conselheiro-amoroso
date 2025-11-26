// Serviço para comunicação com a API do backend
const API_BASE_URL = 'https://hitch-conselheiro-amoroso-production.up.railway.app';

export const chatService = {

  async sendMessage(message) {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        throw new Error(`Erro do servidor: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error.message.includes('fetch')) {
        throw new Error('Erro de conexão. Verifique sua internet e tente novamente.');
      }
      
      throw new Error(error.message || 'Falha na comunicação com o servidor. Tente novamente.');
    }
  }
};

export default chatService;
