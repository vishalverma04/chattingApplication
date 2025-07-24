import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext.jsx";

const API_URL = 'http://localhost:4000/api';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const user=localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const token=localStorage.getItem('authToken') ? localStorage.getItem('authToken') : null;

  const fetchChats = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/chat/fetch-chats/${user._id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched chats:", data);
      setChats(data);
    } catch (error) {
      console.error("Failed to fetch chats", error);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const { data } = await axios.get(`${API_URL}/messages/${chatId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  };

  const sendMessage = async ({ chatId, userId, content }) => {
    try {
      const { data } = await axios.post(`${API_URL}/messages`, {
        chatId,
        userId,
        content,
      });

      // Append the new message to existing messages
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        fetchChats,
        selectedChat,
        setSelectedChat,
        messages,
        setMessages,
        fetchMessages,
        sendMessage, // ✅ now included
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
