const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    loginCount: {
      type: Number,
      required: true,
      default: 0,
    },
    googleId: {
      type: String,
      unique: true,
    },
    loginTime:{
      type: Date,
      default: Date.now,
    },
    timeDifferenceMs: {
      type: Number,
      default: 0,
    },
    adFreeTime: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const users = mongoose.model("users", userSchema);

module.exports = users;
