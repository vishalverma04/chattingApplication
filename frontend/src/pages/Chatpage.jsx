import React, { useEffect, useState } from 'react';
import { 
  User, 
  Users, 
  MessageSquare, 
  Send, 
  Paperclip, 
  Menu,
  Search,
  X,
  FileText,
  Image,
  Download
} from 'lucide-react';

import { useChat } from '../context/ChatContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useRef } from 'react';

const ChatPage = () => {
  const { chats, messages, sendMessage, fetchChats,fetchMessages } = useChat();
  
  const user=localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    console.log(user);
    const fetchingChat = async () => {
      await fetchChats();
    };
    fetchingChat();
  }, []); 

  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);



  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await sendMessage({
        chatId: chats[selectedChat]._id,
        userId: user._id,
        content: newMessage,
      });
      setNewMessage('');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const selectChat =async (index) => {
    setSelectedChat(index);
    await fetchMessages(chats[index]._id);
    console.log(messages);
    console.log('Selected chat:', chats[index]);
    setIsSidebarOpen(false); 
    
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleTimeString();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        w-80 h-full bg-white border-r border-gray-200 flex flex-col z-30
      `}>
        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                YU
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Your Name</h3>
                <p className="text-sm text-green-500">Online</p>
              </div>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat, index) => (
            <div
              key={chat._id}
              onClick={() => selectChat(index)}
              className={`
                p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors
                ${selectedChat === index ? 'bg-blue-50 border-blue-200' : ''}
              `}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img src={chat.avatar} className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold
                    ${chat.isGroupChat ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'}
                  `}>
                  </img>
                  {!chat.isGroupChat && chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900 truncate">{chat.chatName}</h4>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{formatDate(chat.updatedAt)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    {chat.unreadCount > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 ml-2 flex-shrink-0">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                  {chat.isGroup && (
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Users size={12} className="mr-1" />
                      {chat.participants} participants
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={toggleSidebar}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
              >
                <Menu size={20} />
              </button>
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold
                ${chats[selectedChat]?.isGroupChat ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'}
              `}>
                {selectedChat !== null && (
                  <img src={chats[selectedChat]?.avatar} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{chats[selectedChat]?.chatName}</h3>
                {chats[selectedChat]?.isGroupChat ? (
                  <p className="text-sm text-gray-500">
                    {chats[selectedChat]?.participants} participants
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    {chats[selectedChat]?.isOnline ? 'Online' : 'Last seen recently'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 px-8 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`flex ${message.sender._id === user._id ? 'justify-end' : 'justify-start'}`}
              title={message.timestamp}

            >
              <div className={`
                max-w-xs lg:max-w-md px-4 py-2 rounded-2xl
                ${message.sender._id === user._id
                  ? 'bg-blue-200 text-gray-900 shadow-sm border border-blue-300' 
                  : 'bg-green-200 text-gray-900 shadow-sm border border-gray-200'
                }
              `}>
                <p className="text-sm break-words">{message.content}</p>
                {message.file.length>0 && (
                  <div className="mt-2">
                    {message.file.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <FileText size={16} className="text-gray-500" />
                        <a 
                          href={file} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 hover:underline"
                        >
                          {'file'}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
                <p className={`text-xs mt-1 ${message.isSent ? 'text-blue-100' : 'text-gray-500'}`}>
                  {formatDate(message.createdAt)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} className="h-0"></div>
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Paperclip size={20} />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
                placeholder="Type a message..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`
                p-2 rounded-full transition-colors
                ${newMessage.trim() 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ChatPage;