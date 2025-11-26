import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Nav from '../Nav';

describe('Nav Component', () => {
  it('deve renderizar o componente Nav', () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('deve exibir a logo do Hitch', () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );
    
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo_hitch.png');
  });

  it('deve conter um link para a página inicial', () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('deve ter classes CSS responsivas aplicadas na logo', () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );
    
    const logo = screen.getByAltText('Logo');
    expect(logo).toHaveClass('h-12', 'sm:h-14', 'md:h-16', 'w-auto');
  });
});
