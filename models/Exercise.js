const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    username: String,
    description: String,
    duration: Number,
    date: Date,
    userId: String,
  },
  { versionKey: false }
);

exports.Exercise = mongoose.model("Exercise", exerciseSchema);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

exports.User = mongoose.model("User", userSchema);
