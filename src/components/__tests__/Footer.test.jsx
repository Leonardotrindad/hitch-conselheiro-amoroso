import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  it('deve renderizar o componente Footer', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('deve exibir o copyright com o ano atual', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    const copyright = screen.getByText(new RegExp(`© ${currentYear} Hitch`));
    expect(copyright).toBeInTheDocument();
  });

  it('deve exibir a mensagem "Todos os direitos reservados"', () => {
    render(<Footer />);
    
    const rightsText = screen.getByText(/Todos os direitos reservados/i);
    expect(rightsText).toBeInTheDocument();
  });

  it('deve exibir os nomes dos criadores do projeto', () => {
    render(<Footer />);
    
    const creatorsText = screen.getByText(/Feito com ❤️ por liv, mell, pedro, isa, leo e natalia/i);
    expect(creatorsText).toBeInTheDocument();
  });

  it('deve ter as classes de estilo corretas aplicadas', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('w-full', 'bg-gray-50', 'border-t', 'border-gray-200');
  });
});
