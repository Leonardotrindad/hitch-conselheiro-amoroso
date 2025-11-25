import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HowItWorks from '../HowItWorks';

// Mock dos componentes de animação
vi.mock('../animations/ChatAnimation', () => ({
  default: () => <div data-testid="chat-animation">Chat Animation</div>
}));

vi.mock('../animations/AnaliseAnimation', () => ({
  default: () => <div data-testid="analise-animation">Analise Animation</div>
}));

vi.mock('../animations/IdeaAnimation', () => ({
  default: () => <div data-testid="idea-animation">Idea Animation</div>
}));

describe('HowItWorks Component', () => {
  it('deve renderizar o componente HowItWorks', () => {
    render(<HowItWorks />);
    
    const heading = screen.getByRole('heading', { name: /Here's how Hitch helps/i });
    expect(heading).toBeInTheDocument();
  });

  it('deve exibir o nome "Hitch" em destaque no título', () => {
    render(<HowItWorks />);
    
    const hitchText = screen.getByText('Hitch');
    expect(hitchText).toBeInTheDocument();
    expect(hitchText).toHaveClass('text-[#F14A5B]', 'font-oleo-test');
  });

  it('deve renderizar os 3 passos do processo', () => {
    render(<HowItWorks />);
    
    // Step 1
    expect(screen.getByText('Share Your Context')).toBeInTheDocument();
    expect(screen.getByText(/Describe your situation/i)).toBeInTheDocument();
    
    // Step 2
    expect(screen.getByText('AI Analysis')).toBeInTheDocument();
    expect(screen.getByText(/Hitch analyzes patterns and emotions/i)).toBeInTheDocument();
    
    // Step 3
    expect(screen.getByText('Receive Your Perspective')).toBeInTheDocument();
    expect(screen.getByText(/Receive clear advice/i)).toBeInTheDocument();
  });

  it('deve renderizar as 3 animações correspondentes aos passos', () => {
    render(<HowItWorks />);
    
    expect(screen.getByTestId('chat-animation')).toBeInTheDocument();
    expect(screen.getByTestId('analise-animation')).toBeInTheDocument();
    expect(screen.getByTestId('idea-animation')).toBeInTheDocument();
  });

  it('deve exibir o aviso legal no rodapé da seção', () => {
    render(<HowItWorks />);
    
    const disclaimer = screen.getByText(/Please note: Hitch is an AI for entertainment and insights/i);
    expect(disclaimer).toBeInTheDocument();
    expect(disclaimer).toHaveClass('text-xs', 'sm:text-sm', 'text-gray-500');
  });

  it('deve ter o background correto aplicado', () => {
    const { container } = render(<HowItWorks />);
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-[#fcf3f1]');
  });

  it('deve ter layout em grid responsivo com 3 colunas', () => {
    const { container } = render(<HowItWorks />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
  });
});
