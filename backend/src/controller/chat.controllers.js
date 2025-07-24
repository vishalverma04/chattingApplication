import {asyncHander} from '../utils/asyncHandler.js';
import { Chat } from '../models/chat.model.js';
import { User } from '../models/user.model.js';

const accessChat = asyncHander(async (req, res) => {
    const { userId } = req.body;


  if (!userId) {
    return res.status(400).json({ message: "UserId param not sent" });
  }

  try {
    let chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [req.user._id, userId] },
    })
      .populate("users", "-password")
      .populate("latestMessage");

    chat = await User.populate(chat, {
      path: "latestMessage.sender",
      select: "name email",
    });

    if (chat) return res.status(200).json(chat);

    const createdChat = await Chat.create({
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    });

    const fullChat = await Chat.findById(createdChat._id).populate(
      "users",
      "-password"
    );

    res.status(200).json(fullChat);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

const fetchChats = asyncHander(async (req, res) => {
    try {
    let chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    chats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name email",
    });

    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch chats", error: err });
  }
});

const createGroupChat = asyncHander(async (req, res) => {
    const { name, users } = req.body;

  if (!users || !name) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  let groupUsers = JSON.parse(users);

  if (groupUsers.length < 2) {
    return res
      .status(400)
      .json({ message: "More than 2 users are required to form a group chat" });
  }

  groupUsers.push(req.user); // Add current user

  try {
    const groupChat = await Chat.create({
      chatName: name,
      isGroupChat: true,
      users: groupUsers,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findById(groupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (err) {
    res.status(500).json({ message: "Failed to create group", error: err });
  }
});     

const renameGroup = asyncHander(async (req, res) => {
    const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  res.status(200).json(updatedChat);
});

const addToGroup = asyncHander(async (req, res) => {
    const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    return res.status(404).json({ message: "Chat not found" });
  }

  res.status(200).json(added);
});

const removeFromGroup = asyncHander(async (req, res) => {
    const { chatId, userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    return res.status(404).json({ message: "Chat not found" });
  }

  res.status(200).json(removed);
});

export {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
