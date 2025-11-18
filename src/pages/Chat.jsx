import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import EmojiPicker from "emoji-picker-react";
import { useChat } from "../hooks/useChat";
import hitchAnimation from "../assets/animations/hitch_face.json";
import {
  HiMenu,
  HiPlus,
  HiDotsVertical,
  HiLightBulb,
  HiHeart,
  HiChat,
} from "react-icons/hi";
import { IoSend, IoMic, IoImage, IoAdd } from "react-icons/io5";
import { BsStars, BsEmojiSmile } from "react-icons/bs";
import Nav from "../components/Nav";

const getInitialMessage = () => ({
  sender: "hitch",
  text: "Hi there! 👋 I'm Hitch, your relationship companion. Ready to explore love, connection, and everything in between?",
});

function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [inputMessage, setInputMessage] = useState("");

  const {
    messages: backendMessages,
    isLoading: backendLoading,
    error,
    sendMessage: backendSendMessage,
    clearMessages,
  } = useChat();

  const [chatSessions, setChatSessions] = useState([]);

  const [activeChatId, setActiveChatId] = useState(null);

  const chatContainerRef = useRef(null);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    if (chatSessions.length === 0) {
      const firstChatId = crypto.randomUUID();
      const newChat = {
        id: firstChatId,
        title: "New Chat",
        history: [getInitialMessage()],
      };
      setChatSessions([newChat]);
      setActiveChatId(firstChatId);
    }
  }, [chatSessions.length]);

  const activeChat =
    chatSessions.find((chat) => chat.id === activeChatId) || null;

  const allMessages = useMemo(() => {
    const localChatHistory = activeChat
      ? activeChat.history
      : [getInitialMessage()];
    const messages = [...localChatHistory];
    if (backendMessages.length > 0) {
      // Add backend messages after the initial message
      const backendMessagesFormatted = backendMessages.map((msg) => ({
        sender: msg.sender,
        text: msg.text,
        timestamp: msg.timestamp,
      }));
      messages.splice(1, 0, ...backendMessagesFormatted);
    }
    return messages;
  }, [activeChat, backendMessages]);

  const hasChatStarted = backendMessages.length > 0;

  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo(0, scrollHeight);
    }
  }, [allMessages, backendLoading]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const messageText = inputMessage.trim();
    if (!messageText || !activeChatId) return;

    setChatSessions((prevSessions) =>
      prevSessions.map((chat) => {
        if (chat.id === activeChatId) {
          const isFirstUserMsg = backendMessages.length === 0;
          return {
            ...chat,
            title: isFirstUserMsg
              ? messageText.substring(0, 40) +
                (messageText.length > 40 ? "..." : "")
              : chat.title,
          };
        }
        return chat;
      })
    );

    setInputMessage("");

    await backendSendMessage(messageText);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNewChat = () => {
    const newChatId = crypto.randomUUID();
    const newChat = {
      id: newChatId,
      title: "New Chat",
      history: [getInitialMessage()],
    };

    clearMessages();

    setChatSessions((prev) => [newChat, ...prev]);
    setActiveChatId(newChatId);
    setIsSidebarOpen(false);
  };

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    setIsSidebarOpen(false);
    clearMessages(); 
  };

  const handleQuickAction = (actionType) => {
    const messages = {
      tips: "Give me some relationship tips to improve my connection with my partner",
      stories: "Tell me a beautiful love story to inspire my relationship",
      magic: "Share some romantic ideas to create magical moments with my loved one"
    };
    
    setInputMessage(messages[actionType]);
  };

  const handleEmojiClick = (emojiData) => {
    setInputMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(prev => !prev);
  };

  return (
    <div className="min-h-screen p-20" style={{
      background: 'radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(222, 176, 207, 1) 17%, rgba(189, 181, 219, 1) 54%, rgba(172, 184, 225, 1) 73%, rgba(148, 187, 233, 1) 100%)'
    }}>
      <div className="flex w-full h-[calc(100vh-8rem)] bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <aside
          className={`bg-white/20 backdrop-blur-3xl border-r border-white/40 shadow-2xl
                     flex flex-col shrink-0 transition-all duration-300 ease-in-out
                     rounded-l-3xl relative
                     before:absolute before:inset-0 before:bg-linear-to-b before:from-white/30 before:to-white/10 before:rounded-l-3xl before:pointer-events-none
                     ${isSidebarOpen ? "w-80" : "w-16"}`}
        >
          <div className="p-4 border-b border-white/30 relative z-10 bg-white/10 backdrop-blur-sm">
            <div
              className={`flex items-center ${
                isSidebarOpen ? "justify-between" : "justify-center"
              }`}
            >
              {isSidebarOpen && (
                <div className="flex items-center space-x-3">
                  <div>
                    <Link to="/" className="block hover:opacity-80 transition-opacity duration-200">
                      <h1 className="font-bold text-gray-800">
                        <img
                          src="logo_hitch.png"
                          alt="Logo Hitch AI"
                          className="w- h-20 cursor-pointer"
                        />
                      </h1>
                    </Link>
                    <p className="text-xs text-gray-500 ml-6">Love Advisor</p>
                  </div>
                </div>
              )}
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors text-gray-600"
              >
                <HiMenu className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-4 relative z-10">
            <button
              onClick={handleNewChat}
              className={`group relative overflow-hidden bg-white/25 backdrop-blur-sm border border-white/40 hover:bg-white/40 hover:border-white/60
                         text-gray-700 font-medium rounded-lg transition-all duration-200
                         ${
                           isSidebarOpen
                             ? "w-full py-3 px-4 flex items-center space-x-2"
                             : "w-10 h-10 flex items-center justify-center"
                         }`}
            >
              <div className="absolute inset-0 rounded-lg bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <HiPlus
                className={`relative z-10 text-pink-600  group-hover:scale-110 transition-transform ${
                  isSidebarOpen ? "w-4 h-4" : "w-5 h-5"
                }`}
              />
              {isSidebarOpen && (
                <span className="relative z-10 group-hover:text-pink-700 transition-colors">New Conversation</span>
              )}
            </button>
          </div>

          {isSidebarOpen && (
            <div className="px-4 mb-4 relative z-10">
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => handleQuickAction('tips')}
                  className="p-3 rounded-lg bg-white/25 hover:bg-white/40 border border-white/30 hover:border-white/50 transition-all duration-200 group backdrop-blur-sm"
                >
                  <HiLightBulb className="w-5 h-5 text-pink-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-gray-700 font-medium">Tips</span>
                </button>
                <button 
                  onClick={() => handleQuickAction('magic')}
                  className="p-3 rounded-lg bg-white/25 hover:bg-white/40 border border-white/30 hover:border-white/50 transition-all duration-200 group backdrop-blur-sm"
                >
                  <BsStars className="w-5 h-5 text-purple-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-gray-700 font-medium">Magic</span>
                </button>
                <button 
                  onClick={() => handleQuickAction('stories')}
                  className="p-3 rounded-lg bg-white/25 hover:bg-white/40 border border-white/30 hover:border-white/50 transition-all duration-200 group backdrop-blur-sm"
                >
                  <HiChat className="w-5 h-5 text-rose-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-gray-700 font-medium">Stories</span>
                </button>
              </div>
            </div>
          )}

          {isSidebarOpen && (
            <>
              <div className="px-4 pb-2 relative z-10">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Recent Chats
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto px-4 space-y-2 relative z-10">
                {chatSessions
                  .filter(
                    (chat) =>
                      backendMessages.length > 0 || chat.id === activeChatId
                  )
                  .map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => handleSelectChat(chat.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 backdrop-blur-sm
                                 ${
                                   chat.id === activeChatId
                                     ? "bg-white/40 border border-white/60"
                                     : "hover:bg-white/25 hover:border hover:border-white/40"
                                 }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            chat.id === activeChatId
                              ? "bg-pink-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 truncate text-sm">
                            {chat.title}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {chat.history.length > 1
                              ? "Last message..."
                              : "New chat"}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </>
          )}
        </aside>

        <main className="flex-1 flex flex-col bg-transparent relative rounded-r-3xl overflow-hidden">
          {hasChatStarted ? (
            <>
              <header className="bg-white/60 backdrop-blur-2xl border-b border-white/30 rounded-tr-3xl relative">
                <div className="absolute inset-0 bg-linear-to-r from-pink-50/50 to-purple-50/50 rounded-tr-3xl"></div>
                <div className="relative z-10 flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center">
                      <Lottie
                        animationData={hitchAnimation}
                        loop={true}
                        speed={2.0}
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-800 text-lg">Hitch</h2>
                      <p className="text-sm text-gray-600 flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Always here to help</span>
                      </p>
                    </div>
                  </div>
                </div>
              </header>

              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-8 relative"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                }}
              >
                <div className="max-w-4xl mx-auto space-y-6">
                  {allMessages.map(
                    (message, index) =>
                      index > 0 && (
                        <div
                          key={index}
                          className={`flex ${
                            message.sender === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          {message.sender === "user" ? (
                            <div className="flex items-end space-x-3 max-w-lg ml-auto">
                              <div className="bg-linear-to-r from-pink-500 to-rose-500 text-white p-4 rounded-2xl rounded-br-md relative">
                                <div className="absolute inset-0 bg-white/10 rounded-2xl rounded-br-md"></div>
                                <p className="text-sm leading-relaxed relative z-10">
                                  {message.text}
                                </p>
                                {message.timestamp && (
                                  <p className="text-xs mt-2 opacity-80 relative z-10">
                                    {message.timestamp}
                                  </p>
                                )}
                              </div>
                              <div className="w-10 h-10 bg-linear-to-br from-pink-200 to-rose-200 rounded-2xl flex items-center justify-center shrink-0">
                                <span className="text-lg">👤</span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start space-x-4 max-w-3xl">
                              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 relative">
                                <Lottie
                                  animationData={hitchAnimation}
                                  loop={true}
                                  speed={2.0}
                                  className="w-8 h-8 relative z-10"
                                />
                              </div>
                              <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-5 rounded-2xl rounded-tl-md relative group">
                                <div className="absolute inset-0 bg-linear-to-br from-white/60 to-white/40 rounded-2xl rounded-tl-md"></div>
                                <div className="relative z-10">
                                  <div className="flex items-center space-x-2 mb-3">
                                    <span className="text-base font-bold text-pink-500">
                                      Hitch
                                    </span>
                                    <BsStars className="w-4 h-4 text-pink-500" />
                                  </div>
                                  <p className="text-sm text-gray-700 leading-relaxed">
                                    {message.text}
                                  </p>
                                  {message.timestamp && (
                                    <p className="text-xs text-gray-500 mt-3">
                                      {message.timestamp}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                  )}

                  {backendLoading && (
                    <div className="flex items-start space-x-4 max-w-3xl">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 relative">
                        <Lottie
                          animationData={hitchAnimation}
                          loop={true}
                          speed={2.5}
                          className="w-8 h-8 relative z-10"
                        />
                      </div>
                      <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-5 rounded-2xl rounded-tl-md relative">
                        <div className="absolute inset-0 bg-linear-to-br from-white/60 to-white/40 rounded-2xl rounded-tl-md"></div>
                        <div className="flex items-center space-x-3 relative z-10">
                          <div className="flex space-x-1">
                            <div className="w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.15s" }}
                            ></div>
                            <div
                              className="w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.3s" }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 font-medium">
                            Hitch is thinking...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="flex justify-center">
                      <div className="bg-red-50 border border-red-200 p-4 rounded-2xl max-w-md">
                        <p className="text-red-600 text-sm text-center">
                          {error}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 flex flex-col justify-center items-center p-6 text-center">
                <div className="space-y-8 max-w-2xl">
                

                  <div className="space-y-4 flex items-center justify-center flex-col">
                     <span className="flex flex-row items-center justify-center">
                        <img
                          src="img_features.png"
                          alt="Logo Hitch AI"
                          className="w-auto h-100"
                        />
                      </span>
                    <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
                      Welcome!
                     
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      {getInitialMessage().text}
                    </p>
                  </div>

                
                </div>
              </div>
            </>
          )}

          <footer className="bg-white/80 backdrop-blur-xl border-t border-pink-100/50 p-6 rounded-br-3xl">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSendMessage} className="relative">
                <div className="flex items-center space-x-4 bg-white/90 backdrop-blur-sm border border-pink-200/50 rounded-xl py-2 px-4 shadow-lg focus-within:border-pink-400 focus-within:shadow-xl transition-all">
                

                  <input
                    type="text"
                    placeholder="Share your thoughts with Hitch..."
                    className="flex-1 bg-transparent outline-none border-none text-gray-800 text-md placeholder:text-gray-500"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    disabled={backendLoading || !activeChatId}
                  />

                  <div className="flex items-center space-x-2">
                    <div className="relative" ref={emojiPickerRef}>
                      <button
                        type="button"
                        onClick={toggleEmojiPicker}
                        className={`p-2 rounded-full hover:bg-pink-100 transition-colors ${
                          showEmojiPicker ? 'bg-pink-100 text-pink-600' : 'text-gray-500 hover:text-pink-600'
                        }`}
                      >
                        <BsEmojiSmile className="w-5 h-5" />
                      </button>
                      
                      {showEmojiPicker && (
                        <div className="absolute bottom-full right-0 mb-2 z-50 shadow-2xl rounded-lg overflow-hidden">
                          <EmojiPicker
                            onEmojiClick={handleEmojiClick}
                            autoFocusSearch={false}
                            theme="light"
                            height={400}
                            width={350}
                            searchDisabled={false}
                            skinTonesDisabled={false}
                            previewConfig={{
                              showPreview: false
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="p-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      disabled={
                        backendLoading || !activeChatId || !inputMessage.trim()
                      }
                    >
                      <IoSend className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {!hasChatStarted && (
                  <div className="flex items-center justify-center space-x-2 mt-4">
                    {[
                      "💕 Love advice",
                      "🎭 Date ideas",
                      "💬 Communication",
                    ].map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() =>
                          setInputMessage(
                            suggestion.split(" ").slice(1).join(" ")
                          )
                        }
                        className="px-4 py-2 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-full text-sm transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </form>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default Chat;
