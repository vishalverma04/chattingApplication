import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
  {
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: true
    },
    fileUrl: {
      type: String,
      required: true
    },
    originalName: {
      type: String
    },
    size: {
      type: Number // in bytes
    },
    type: {
      type: String // e.g. image/png, application/pdf
    }
  },
  {
    timestamps: true
  }
);

const File = mongoose.model('File', fileSchema);
export { File };
