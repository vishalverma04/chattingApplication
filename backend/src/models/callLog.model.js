import mongoose from 'mongoose';

const callLogSchema = new mongoose.Schema(
  {
    caller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
    },
    callType: {
      type: String,
      enum: ['video', 'audio'],
      required: true
    },
    status: {
      type: String,
      enum: ['missed', 'accepted', 'rejected', 'ended'],
      default: 'missed'
    },
    startedAt: {
      type: Date
    },
    endedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const CallLog = mongoose.model('CallLog', callLogSchema);
export { CallLog };
