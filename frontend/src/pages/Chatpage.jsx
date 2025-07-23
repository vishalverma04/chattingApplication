import React, { useState } from 'react';
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

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for chats
  const chats = [
    {
      id: 1,
      name: "Sarah Wilson",
      avatar: "SW",
      lastMessage: "Hey! How's the project going?",
      timestamp: "2:30 PM",
      unreadCount: 2,
      isGroup: false,
      isOnline: true
    },
    {
      id: 2,
      name: "Design Team",
      avatar: "DT",
      lastMessage: "Alice: I've uploaded the new mockups",
      timestamp: "1:45 PM",
      unreadCount: 0,
      isGroup: true,
      participants: 5
    },
    {
      id: 3,
      name: "John Davis",
      avatar: "JD",
      lastMessage: "Thanks for the feedback!",
      timestamp: "12:20 PM",
      unreadCount: 1,
      isGroup: false,
      isOnline: false
    },
    {
      id: 4,
      name: "Marketing Team",
      avatar: "MT",
      lastMessage: "Mike: The campaign is ready for review",
      timestamp: "11:30 AM",
      unreadCount: 5,
      isGroup: true,
      participants: 8
    },
    {
      id: 5,
      name: "Emily Chen",
      avatar: "EC",
      lastMessage: "See you at the meeting!",
      timestamp: "Yesterday",
      unreadCount: 0,
      isGroup: false,
      isOnline: true
    }
  ];

  // Mock messages for selected chat
  const messages = [
    {
      id: 1,
      sender: "Sarah Wilson",
      content: "Hey! How's the project going?",
      timestamp: "2:25 PM",
      isSent: false,
      type: "text"
    },
    {
      id: 2,
      sender: "You",
      content: "Going well! I'm almost done with the frontend components.",
      timestamp: "2:27 PM",
      isSent: true,
      type: "text"
    },
    {
      id: 3,
      sender: "Sarah Wilson",
      content: "Great! I have some design assets for you.",
      timestamp: "2:28 PM",
      isSent: false,
      type: "text"
    },
    {
      id: 4,
      sender: "Sarah Wilson",
      content: "design-mockups.pdf",
      timestamp: "2:29 PM",
      isSent: false,
      type: "file",
      fileType: "pdf"
    },
    {
      id: 5,
      sender: "You",
      content: "Perfect! Thanks for sharing.",
      timestamp: "2:30 PM",
      isSent: true,
      type: "text"
    },
    {
      id: 6,
      sender: "Sarah Wilson",
      content: "hero-section.png",
      timestamp: "2:31 PM",
      isSent: false,
      type: "file",
      fileType: "image"
    }
  ];

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const selectChat = (index) => {
    setSelectedChat(index);
    setIsSidebarOpen(false); // Close sidebar on mobile after selecting chat
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
          {filteredChats.map((chat, index) => (
            <div
              key={chat.id}
              onClick={() => selectChat(index)}
              className={`
                p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors
                ${selectedChat === index ? 'bg-blue-50 border-blue-200' : ''}
              `}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold
                    ${chat.isGroup ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'}
                  `}>
                    {chat.avatar}
                  </div>
                  {!chat.isGroup && chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900 truncate">{chat.name}</h4>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{chat.timestamp}</span>
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
                ${filteredChats[selectedChat]?.isGroup ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'}
              `}>
                {filteredChats[selectedChat]?.avatar}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{filteredChats[selectedChat]?.name}</h3>
                {filteredChats[selectedChat]?.isGroup ? (
                  <p className="text-sm text-gray-500">
                    {filteredChats[selectedChat]?.participants} participants
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    {filteredChats[selectedChat]?.isOnline ? 'Online' : 'Last seen recently'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
              title={message.timestamp}
            >
              <div className={`
                max-w-xs lg:max-w-md px-4 py-2 rounded-2xl
                ${message.isSent 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-900 shadow-sm border border-gray-200'
                }
              `}>
                {message.type === 'text' ? (
                  <p className="text-sm">{message.content}</p>
                ) : (
                  <div className="flex items-center space-x-2">
                    {message.fileType === 'pdf' ? (
                      <FileText size={16} className={message.isSent ? 'text-white' : 'text-red-500'} />
                    ) : (
                      <Image size={16} className={message.isSent ? 'text-white' : 'text-blue-500'} />
                    )}
                    <span className="text-sm">{message.content}</span>
                    <Download size={14} className={`cursor-pointer ${message.isSent ? 'text-white' : 'text-gray-500'} hover:opacity-70`} />
                  </div>
                )}
                <p className={`text-xs mt-1 ${message.isSent ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
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