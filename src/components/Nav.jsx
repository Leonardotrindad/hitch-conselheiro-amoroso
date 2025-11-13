import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        // MUDANÇAS AQUI:
        // 1. Troquei 'py-4' por 'py-3' (diminui o padding vertical)
        // 2. Removi 'shadow-sm' (a borda já faz a separação)
        // 3. Adicionei 'border-b border-black' (borda preta)
        <nav className="w-full bg-white border-b border-black py-3">
            
            <div className="container mx-auto flex justify-between items-center px-6">

                {/* 1. Logo */}
                <Link to="/">
                    {/* MUDANÇA AQUI:
                      1. Aumentei a logo de 'h-14' para 'h-16' 
                    */}
                    <img src="/public/logo_hitch.png" alt="Logo" className="h-16 w-auto" />
                </Link>

                {/* 2. Itens do Menu */}
                <ul className="flex items-center space-x-8">                     
                    <li>
                        <Link 
                            to="/chat" 
                            className="font-medium text-gray-700 hover:text-[#F14A5B] transition-colors duration-200"
                        >
                            Chat
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/how-it-works" 
                            className="font-medium text-gray-700 hover:text-[#F14A5B] transition-colors duration-200"
                        >
                            How It Works
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;