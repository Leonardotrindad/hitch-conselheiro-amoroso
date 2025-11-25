import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Chat from '../Chat';

// Mock do hook useChat
const mockSendMessage = vi.fn();
const mockClearMessages = vi.fn();

vi.mock('../../hooks/useChat', () => ({
  useChat: () => ({
    messages: [],
    isLoading: false,
    error: null,
    sendMessage: mockSendMessage,
    clearMessages: mockClearMessages
  })
}));

// Mock do Lottie
vi.mock('lottie-react', () => ({
  default: ({ animationData, className }) => (
    <div data-testid="lottie-animation" className={className}>
      Lottie Animation
    </div>
  )
}));

// Mock do EmojiPicker
vi.mock('emoji-picker-react', () => ({
  default: ({ onEmojiClick }) => (
    <div data-testid="emoji-picker">
      <button onClick={() => onEmojiClick({ emoji: '😊' })}>😊</button>
    </div>
  )
}));

// Mock do Nav
vi.mock('../../components/Nav', () => ({
  default: () => <nav data-testid="nav">Nav</nav>
}));

describe('Chat Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar a página Chat', () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    );
    
    expect(screen.getByRole('complementary')).toBeInTheDocument(); // sidebar (aside)
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('deve exibir mensagem de boas-vindas inicial quando não há chat iniciado', () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Welcome!/i)).toBeInTheDocument();
    expect(screen.getByText(/I'm Hitch, your relationship companion/i)).toBeInTheDocument();
  });

  it('deve exibir o campo de input de mensagem', () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    );
    
    const input = screen.getByPlaceholderText(/Share your thoughts with Hitch/i);
    expect(input).toBeInTheDocument();
  });

  it('deve permitir digitar no campo de input', () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    );
    
    const input = screen.getByPlaceholderText(/Share your thoughts with Hitch/i);
    fireEvent.change(input, { target: { value: 'Hello Hitch!' } });
    
    expect(input).toHaveValue('Hello Hitch!');
  });

  it('deve ter o botão de enviar mensagem', () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    );
    
    const sendButton = screen.getByRole('button', { name: '' }); // Botão de enviar (ícone)
    expect(sendButton).toBeInTheDocument();
  });

  it('deve desabilitar o botão de enviar quando o input está vazio', () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    );
    
    const input = screen.getByPlaceholderText(/Share your thoughts with Hitch/i);
    const form = input.closest('form');
    const sendButton = form?.querySelector('button[type="submit"]');
    
    expect(sendButton).toBeDisabled();
  });

  it('deve habilitar o botão de enviar quando há texto no input', () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    );
    
    const input = screen.getByPlaceholderText(/Share your thoughts with Hitch/i);
    fireEvent.change(input, { target: { value: 'Test message' } });
    
    const form = input.closest('form');
    const sendButton = form?.querySelector('button[type="submit"]');
    
    expect(sendButton).not.toBeDisabled();
  });

  it('deve exibir botão para criar novo chat', () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    );
    
    const newChatButton = screen.getByText(/New Conversation/i);
    expect(newChatButton).toBeInTheDocument();
  });

  it('deve exibir botões de ações rápidas (Tips, Magic, Stories)', () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Tips')).toBeInTheDocument();
    expect(screen.getByText('Magic')).toBeInTheDocument();
    expect(screen.getByText('Stories')).toBeInTheDocument();
  });

  it('deve alternar a sidebar ao clicar no botão de menu', () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    );
    
    const sidebar = screen.getByRole('complementary');
    
    // Sidebar deve estar fechada inicialmente (w-12 ou w-16)
    expect(sidebar).toHaveClass('w-12');
    
    // Clicar no botão de menu
    const menuButtons = screen.getAllByRole('button');
    const menuButton = menuButtons[0]; // Primeiro botão é o toggle da sidebar
    
    fireEvent.click(menuButton);
    
    // Sidebar deve abrir (w-72 ou w-80)
    expect(sidebar).toHaveClass('w-72');
  });

  it('deve exibir sugestões de mensagens quando não há chat iniciado', () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    );
    
    // Sugestões só aparecem em telas maiores (hidden sm:flex)
    expect(screen.getByText('💕 Love advice')).toBeInTheDocument();
    expect(screen.getByText('🎭 Date ideas')).toBeInTheDocument();
    expect(screen.getByText('💬 Communication')).toBeInTheDocument();
  });

  it('deve preencher o input ao clicar em uma sugestão', () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    );
    
    const suggestion = screen.getByText('💕 Love advice');
    fireEvent.click(suggestion);
    
    const input = screen.getByPlaceholderText(/Share your thoughts with Hitch/i);
    expect(input).toHaveValue('Love advice');
  });

  it('deve chamar sendMessage ao submeter o formulário', async () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    );
    
    const input = screen.getByPlaceholderText(/Share your thoughts with Hitch/i);
    fireEvent.change(input, { target: { value: 'Test message' } });
    
    const form = input.closest('form');
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalledWith('Test message');
    });
  });

  it('deve limpar o input após enviar mensagem', async () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    );
    
    const input = screen.getByPlaceholderText(/Share your thoughts with Hitch/i);
    fireEvent.change(input, { target: { value: 'Test message' } });
    
    const form = input.closest('form');
    fireEvent.submit(form);
    
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('deve exibir o botão de emoji picker', () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    );
    
    const emojiButtons = screen.getAllByRole('button');
    const emojiButton = emojiButtons.find(btn => btn.querySelector('svg')); // Botão com ícone de emoji
    
    expect(emojiButton).toBeInTheDocument();
  });

  it('deve alternar a visibilidade do emoji picker ao clicar no botão', () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    );
    
    // Emoji picker não deve estar visível inicialmente
    expect(screen.queryByTestId('emoji-picker')).not.toBeInTheDocument();
    
    // Encontrar e clicar no botão de emoji (deve ter BsEmojiSmile icon)
    const buttons = screen.getAllByRole('button');
    const emojiButton = buttons.find(btn => {
      const svg = btn.querySelector('svg');
      return svg !== null;
    });
    
    if (emojiButton) {
      fireEvent.click(emojiButton);
      expect(screen.getByTestId('emoji-picker')).toBeInTheDocument();
    }
  });
});
