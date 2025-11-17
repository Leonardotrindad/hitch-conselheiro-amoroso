// File: Chat.jsx

import React, { useState, useRef, useEffect } from "react";
import Lottie from "lottie-react";

import hitchAnimation from "../assets/animations/hitch_face.json";
import { HiMenu, HiSearch, HiPlus } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import Nav from "../components/Footer";

// Initial message from Hitch (now a function to ensure a new instance)
const getInitialMessage = () => ({
  sender: "hitch",
  text: "Hello! I'm Hitch. I'm here to help you see your relationships with more clarity. What would you like to talk about?",
});

function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [inputMessage, setInputMessage] = useState("");

  const [chatSessions, setChatSessions] = useState([]);

  const [activeChatId, setActiveChatId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

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
  const chatHistory = activeChat ? activeChat.history : [getInitialMessage()];
  const hasChatStarted = chatHistory.length > 1;

  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo(0, scrollHeight);
    }
  }, [activeChat]);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const messageText = inputMessage.trim();
    if (!messageText || !activeChatId) return;

    const userMessage = { sender: "user", text: messageText };

    setChatSessions((prevSessions) =>
      prevSessions.map((chat) => {
        if (chat.id === activeChatId) {
          const isFirstUserMsg = chat.history.length === 1;
          return {
            ...chat,

            title: isFirstUserMsg
              ? messageText.substring(0, 40) +
                (messageText.length > 40 ? "..." : "")
              : chat.title,
            history: [...chat.history, userMessage],
          };
        }
        return chat;
      })
    );

    setInputMessage("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const hitchReply = {
      sender: "hitch",
      text: `This is a simulated response to: "${messageText}"`,
    };

    setChatSessions((prevSessions) =>
      prevSessions.map((chat) => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            history: [...chat.history, hitchReply],
          };
        }
        return chat;
      })
    );
    setIsLoading(false);
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

    setChatSessions((prev) => [newChat, ...prev]);

    setActiveChatId(newChatId);
    setIsSidebarOpen(false);
  };

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    setIsSidebarOpen(false);
  };

  return (
    <div>
      <div className="flex w-full h-[calc(100vh)]">
        <aside
          className={`bg-gray-800 text-gray-200 p-4 flex flex-col shrink-0
                     transition-all duration-300 ease-in-out
                     ${isSidebarOpen ? "w-64" : "w-20"}`}
        >
          <div
            className={`flex items-center mb-6 ${
              isSidebarOpen ? "justify-between" : "justify-center"
            }`}
          >
            <button
              onClick={toggleSidebar}
              className="text-2xl p-2 rounded-full hover:bg-gray-700 hover:text-white"
            >
              <HiMenu />
            </button>
            {isSidebarOpen && (
              <button className="text-xl p-2 rounded-full hover:bg-gray-700 hover:text-white">
                <HiSearch />
              </button>
            )}
          </div>

          {/* CHANGE 7: "+ New chat" button is now functional */}
          <button
            onClick={handleNewChat}
            className={`flex items-center font-semibold text-white mb-6 
                       bg-[#F2798F] hover:bg-[#F14A5B] transition-colors
                       ${
                         isSidebarOpen
                           ? "w-full py-2 px-3 rounded text-left"
                           : "w-12 h-12 rounded-full justify-center"
                       }`}
          >
            {isSidebarOpen ? (
              <span>+ New chat</span>
            ) : (
              <HiPlus className="text-xl" />
            )}
          </button>

          {/* CHANGE 8: "Recents" chat list is now dynamic */}
          {isSidebarOpen && (
            <h2 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wide">
              Recents
            </h2>
          )}
          {isSidebarOpen && (
            <div className="flex-1 overflow-y-auto">
              {chatSessions
                .filter((chat) => chat.history.length > 1) // Only shows chats that have ALREADY started
                .map((chat) => (
                  <a
                    key={chat.id}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelectChat(chat.id);
                    }}
                    // Highlights the active chat
                    className={`block w-full text-left py-2 px-3 rounded truncate transition-colors ${
                      chat.id === activeChatId
                        ? "bg-gray-700 font-semibold"
                        : "hover:bg-gray-700"
                    }`}
                    title={chat.title} // Shows the full title on hover
                  >
                    {chat.title}
                  </a>
                ))}
            </div>
          )}
        </aside>

        {/* ===== 2. Chat Area (Right) ===== */}
        {/* The rest of the code here works perfectly */}
        {/* because it already reads from 'hasChatStarted' and 'chatHistory', */}
        {/* which are now derived from the new state. */}
        <main className="flex-1 flex flex-col bg-gray-100">
          {hasChatStarted ? (
            <>
              {/* === ACTIVE CHAT MODE === */}
              <header className="bg-white border-b border-gray-200 p-4 flex items-center shadow-sm">
                <h1 className="text-xl font-semibold text-gray-800">
                  <img
                    src="/public/logo_hitch.png"
                    className="h-18 w-auto mr-2"
                    alt="Logo"
                  />
                </h1>
              </header>

              <div
                ref={chatContainerRef}
                className="flex-1 p-6 overflow-y-auto space-y-4"
              >
                {chatHistory.map(
                  (message, index) =>
                    // Only shows messages AFTER the initial one (index > 0)
                    index > 0 && (
                      <div
                        key={index}
                        className={`flex ${
                          message.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`p-4 rounded-lg shadow-md max-w-lg
                                      ${
                                        message.sender === "user"
                                          ? "bg-[#F2798F] text-white"
                                          : "bg-white text-gray-800"
                                      }`}
                        >
                          <p>{message.text}</p>
                        </div>
                      </div>
                    )
                )}

                {/* "Thinking..." indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-lg shadow-md max-w-lg">
                      <p className="text-gray-500 italic flex items-center ">
                        <div className="w-12 h-12 mr-2">
                          <Lottie
                            animationData={hitchAnimation}
                            loop={true}
                            speed={0}
                          />
                        </div>
                        Hitch is thinking...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* === WELCOME MODE === */}
              <div className="flex-1 flex flex-col justify-center items-center p-6 text-center">
                <div className="w-48 h-48">
                  <Lottie
                    animationData={hitchAnimation}
                    loop={true}
                    speed={1.1}
                  />
                </div>
                <img
                  src="/public/logo_hitch.png"
                  alt="Hitch Logo"
                  className="h-20 w-auto mt-4 mb-2"
                />
                <p className="text-lg text-gray-600 mt-2 max-w-md">
                  {getInitialMessage().text}
                </p>
              </div>
            </>
          )}

          {/* Input Form (Always visible) */}
          <footer className="bg-white border-t border-gray-200 p-4">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center 
                            bg-white rounded-xl py-3 px-5
                            border border-gray-300 shadow-lg 
                            focus-within:border-[#F14A5B] focus-within:ring-2 focus-within:ring-[#F14A5B]
                            max-w-3xl mx-auto 
                            "
            >
              <input
                type="text"
                placeholder="Message..."
                className="flex-1 bg-transparent outline-none border-none text-gray-700 text-lg 
                          placeholder:text-gray-400"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading || !activeChatId} // Disables if there's no active chat
              />
              <button
                type="submit"
                className="text-[#F14A5B] text-2xl p-2 rounded-full hover:bg-pink-100 transition-colors
                           disabled:text-gray-400 disabled:hover:bg-transparent"
                disabled={isLoading || !activeChatId}
              >
                <IoSend />
              </button>
            </form>
          </footer>
        </main>
       
      </div>
    </div>
  );
}

export default Chat;
