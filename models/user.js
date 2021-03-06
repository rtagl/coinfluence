const mongoose = require("mongoose");
const Post = require('./post.js');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  avatar: {
    type: String,
    default: "../images/Happy-Minion-Icon.png"
  } 
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  });

const User = mongoose.model("User", userSchema);

module.exports = User;