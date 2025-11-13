import React from 'react';

function Nav() {
    return (
        <nav className="w-full bg-white shadow-sm border-b border-gray-600">
            <ul className="flex w-full">

                <li className="flex-1 text-center border-l border-r border-gray-600">
                    <a href="/chat" className="font-medium text-gray-600 hover:bg-pink-100 hover:text-pink-700 transition-colors duration-200 block py-6">
                        Chat
                    </a>
                </li>

                <li className="flex-1 text-center border-r border-gray-600">
                    <a href="/blog" className="font-medium text-gray-600 hover:bg-pink-100 hover:text-pink-700 transition-colors duration-200 block py-6">
                        Blog
                    </a>
                </li>

                <li className="flex-1 border-r border-gray-600">
                    <a href="/" className="flex justify-center items-center py-1 transition-colors duration-200 hover:bg-gray-50">
                        <img src="/public/logo_hitch.png" alt="Logo" className="h-18 w-auto" />
                    </a>
                </li>

                <li className="flex-1 text-center border-r border-gray-600">
                    <a href="/login" className="font-medium text-gray-600 hover:bg-pink-100 hover:text-pink-700 transition-colors duration-200 block py-6">
                        Log In
                    </a>
                </li>

                <li className="flex-1 text-center border-r border-gray-600">
                    <a href="/signup" className="font-medium text-gray-600 hover:bg-pink-100 hover:text-pink-700 transition-colors duration-200 block py-6">
                        Sign Up
                    </a>
                </li>

            </ul>
        </nav>
    );
}

export default Nav;