import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

// Mock dos componentes importados
vi.mock('../../components/Nav', () => ({
  default: () => <nav data-testid="nav-component">Nav</nav>
}));

vi.mock('../../components/HeroSection', () => ({
  default: () => <div data-testid="hero-section">HeroSection</div>
}));

vi.mock('../../components/Features', () => ({
  default: () => <div data-testid="features">Features</div>
}));

vi.mock('../../components/HowItWorks', () => ({
  default: () => <div data-testid="how-it-works">HowItWorks</div>
}));

vi.mock('../../components/Footer', () => ({
  default: () => <footer data-testid="footer-component">Footer</footer>
}));

describe('Home Page', () => {
  it('deve renderizar a página Home', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    const homeDiv = screen.getByTestId('nav-component').closest('.home-page');
    expect(homeDiv).toBeInTheDocument();
  });

  it('deve renderizar o componente Nav', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('nav-component')).toBeInTheDocument();
  });

  it('deve renderizar o componente HeroSection', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
  });

  it('deve renderizar o componente HowItWorks', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('how-it-works')).toBeInTheDocument();
  });

  it('deve renderizar o componente Footer', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('footer-component')).toBeInTheDocument();
  });

  it('deve ter a estrutura de layout correta (flex, flex-col, min-h-screen)', () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    const homeDiv = container.querySelector('.home-page');
    expect(homeDiv).toHaveClass('flex', 'flex-col', 'min-h-screen');
  });

  it('deve renderizar todos os componentes na ordem correta', () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    const elements = Array.from(container.querySelectorAll('[data-testid]')).map(
      el => el.getAttribute('data-testid')
    );
    
    expect(elements).toEqual([
      'nav-component',
      'hero-section',
      'how-it-works',
      'footer-component'
    ]);
  });
});
