import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Features from '../Features';

describe('Features Component', () => {
  it('deve renderizar o componente Features', () => {
    render(<Features />);
    
    const heading = screen.getByRole('heading', { name: /Everything you need for clarity/i });
    expect(heading).toBeInTheDocument();
  });

  it('deve exibir o título da seção "How it helps"', () => {
    render(<Features />);
    
    const subtitle = screen.getByText('How it helps');
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass('text-[#F14A5B]');
  });

  it('deve exibir a descrição introdutória', () => {
    render(<Features />);
    
    const description = screen.getByText(/Hitch isn't just a chatbot/i);
    expect(description).toBeInTheDocument();
  });

  it('deve renderizar as 3 features principais', () => {
    render(<Features />);
    
    // Feature 1: Total Privacy
    const privacy = screen.getByText('Total Privacy');
    expect(privacy).toBeInTheDocument();
    expect(screen.getByText(/Your conversations are 100% private and encrypted/i)).toBeInTheDocument();
    
    // Feature 2: Available 24/7
    const availability = screen.getByText('Available 24/7');
    expect(availability).toBeInTheDocument();
    expect(screen.getByText(/Get instant advice anytime, day or night/i)).toBeInTheDocument();
    
    // Feature 3: Impartial Analysis
    const analysis = screen.getByText('Impartial Analysis');
    expect(analysis).toBeInTheDocument();
    expect(screen.getByText(/Hitch uses AI to understand context/i)).toBeInTheDocument();
  });

  it('deve renderizar 3 imagens (placeholders)', () => {
    render(<Features />);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    
    images.forEach((img) => {
      expect(img).toHaveAttribute('src');
      expect(img).toHaveClass('w-full', 'h-auto', 'rounded-lg', 'shadow-xl');
    });
  });

  it('deve ter ícones para cada feature', () => {
    const { container } = render(<Features />);
    
    // Verifica se há 3 containers de ícones com as classes corretas
    const iconContainers = container.querySelectorAll('.bg-\\[\\#F2798F\\]');
    expect(iconContainers.length).toBeGreaterThanOrEqual(3);
  });
});
