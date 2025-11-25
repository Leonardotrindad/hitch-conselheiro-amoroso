import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HeroSection from '../HeroSection';

describe('HeroSection Component', () => {
  it('deve renderizar o componente HeroSection', () => {
    render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('deve exibir o título principal com o nome "Hitch"', () => {
    render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );
    
    const heading = screen.getByText(/It's not always easy to deal with love/i);
    expect(heading).toBeInTheDocument();
    
    const hitchText = screen.getByText('Hitch');
    expect(hitchText).toBeInTheDocument();
    expect(hitchText).toHaveClass('text-[#F14A5B]');
  });

  it('deve exibir o botão "Learn more"', () => {
    render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );
    
    const learnMoreButton = screen.getByText('Learn more');
    expect(learnMoreButton).toBeInTheDocument();
  });

  it('deve alternar a visibilidade da descrição ao clicar em "Learn more"', () => {
    render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );
    
    const learnMoreButton = screen.getByText('Learn more');
    
    // Inicialmente a descrição não deve estar visível
    let description = screen.queryByText(/Hitch uses generative artificial intelligence/i);
    expect(description).not.toBeInTheDocument();
    
    // Clicar no botão deve mostrar a descrição
    fireEvent.click(learnMoreButton);
    description = screen.getByText(/Hitch uses generative artificial intelligence/i);
    expect(description).toBeInTheDocument();
    
    // Clicar novamente deve esconder a descrição
    fireEvent.click(learnMoreButton);
    description = screen.queryByText(/Hitch uses generative artificial intelligence/i);
    expect(description).not.toBeInTheDocument();
  });

  it('deve exibir o botão "Let\'s talk" que redireciona para /chat', () => {
    render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );
    
    const chatButton = screen.getByText(/Let's talk/i);
    expect(chatButton).toBeInTheDocument();
    
    const link = chatButton.closest('a');
    expect(link).toHaveAttribute('href', '/chat');
  });

  it('deve ter a imagem de fundo aplicada no container principal', () => {
    const { container } = render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );
    
    const bgDiv = container.querySelector('.bg-\\[url\\(\'\\/bg-mobile\\.png\'\\)\\]');
    expect(bgDiv).toBeInTheDocument();
  });
});
