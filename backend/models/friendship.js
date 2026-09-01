import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema(
  {
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "blocked"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate relationships
friendshipSchema.index(
  { user1: 1, user2: 1 },
  { unique: true }
);

const Friendship = mongoose.model(
  "Friendship",
  friendshipSchema
);

export default Friendship;