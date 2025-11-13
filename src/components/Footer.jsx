import React from 'react';

function Footer() {
    // Pega o ano atual dinamicamente
    const currentYear = new Date().getFullYear(); 

    return (
        <footer className="w-full bg-gray-50 border-t border-gray-200 py-6">
            <div className="container mx-auto px-4 text-center">
                
                <p className="text-sm text-gray-500 mb-1">
                    © {currentYear} Hitch. Todos os direitos reservados.
                </p>
                
                <p className="text-sm text-gray-500">
                    Feito com ❤️ por @liv.
                </p>
            </div>
        </footer>
    );
}

export default Footer;