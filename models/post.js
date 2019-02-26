const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./user.js');

const postSchema = new Schema({
  comment: String, 
  postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  //postedTo: mongoose.Schema.Types.Coin,
  imgPath: String
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;