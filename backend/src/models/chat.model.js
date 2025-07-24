import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true
    },
    isGroupChat: {
      type: Boolean,
      default: false
    },
    avatar:{
      type: String,
      trim: true,
      default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const Chat = mongoose.model('Chat', chatSchema);
export { Chat };
