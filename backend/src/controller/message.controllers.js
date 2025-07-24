import { Message } from "../models/message.model.js";
import {Chat} from "../models/chat.model.js";
import { User } from "../models/user.model.js";
import  { asyncHander } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const sendMessage = asyncHander(async (req, res) => {
    try {
    const { content, chatId, userId } = req.body;

    if (!chatId || !userId) {
      return res.status(400).json({ message: "chatId and userId are required" });
    }

    let file = [];
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const result = await uploadOnCloudinary(req.files[i].path);
        file.push(result.secure_url);
      }
    }

    const newMessage = new Message({
      sender: userId,
      content,
      file: file,
      chat: chatId,
    });

    await newMessage.save();

    let savedMessage = await Message.findById(newMessage._id)
      .populate("sender", "name email")
      .populate("chat")
      .populate({
        path: "chat.users",
        select: "name email",
      });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: savedMessage });

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ message: "Failed to send message", error });
  }
});

const getAllMessages = asyncHander(async (req, res) => {
    try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate('sender', 'name email')
      .populate('chat');

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error });
  }
});

export { sendMessage, getAllMessages };
  