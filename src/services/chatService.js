// Serviço para comunicação com a API do backend
const API_BASE_URL = 'https://hitch-conselheiro-amoroso-production.up.railway.app';

export const chatService = {
<<<<<<< HEAD

=======
>>>>>>> origin/feature/natalia-tests
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
<<<<<<< HEAD
=======
        // Preserva mensagem específica esperada pelos testes
>>>>>>> origin/feature/natalia-tests
        throw new Error(`Erro do servidor: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
<<<<<<< HEAD
      if (error.message.includes('fetch')) {
        throw new Error('Erro de conexão. Verifique sua internet e tente novamente.');
      }
      
      throw new Error(error.message || 'Falha na comunicação com o servidor. Tente novamente.');
=======
      // Se já for erro de servidor, repropaga
      if (error?.message?.startsWith('Erro do servidor:')) {
        throw error;
      }

      const msg = (error && error.message) ? error.message.toLowerCase() : '';

      // Erros de conexão (fetch/network) exceto timeouts tratados como conexão; timeouts ficam genéricos
      if ((msg.includes('fetch') || msg.includes('network')) && !msg.includes('timeout')) {
        throw new Error('Erro de conexão. Verifique sua internet e tente novamente.');
      }

      // Fallback genérico (inclui timeout)
      throw new Error('Falha na comunicação com o servidor. Tente novamente.');
>>>>>>> origin/feature/natalia-tests
    }
  }
};

export default chatService;
