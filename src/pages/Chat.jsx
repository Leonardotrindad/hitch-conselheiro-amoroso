import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function Chat() {
  const [inputMessage, setInputMessage] = useState('');
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      await sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-page flex flex-col min-h-screen">
      <Nav />
      
      <div className="grow flex flex-col max-w-4xl mx-auto w-full px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Converse com Hitch
          </h1>
          <p className="text-lg text-gray-600">
            Seu conselheiro amoroso pessoal está aqui para ajudar
          </p>
        </div>

        <div className="grow bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col">
          <div className="grow p-6 overflow-y-auto max-h-96">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-12">
                <div className="mb-4">
                  <span className="text-6xl">💕</span>
                </div>
                <p className="text-lg">Olá! Sou o Hitch, seu conselheiro amoroso.</p>
                <p className="text-sm mt-2">Como posso ajudá-lo hoje?</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-pink-500 text-white'
                          : message.isError
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 max-w-xs lg:max-w-md px-4 py-2 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                        <span className="text-sm">Hitch está pensando...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {error && (
            <div className="px-6 py-2 bg-red-50 border-t border-red-200">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="flex space-x-3">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua pergunta..."
                className="grow px-4 py-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                rows="1"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="px-6 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>

        {messages.length > 0 && (
          <div className="mt-4 text-center">
            <button
              onClick={clearMessages}
              className="text-gray-500 hover:text-gray-700 text-sm underline"
            >
              Limpar conversa
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Chat;
