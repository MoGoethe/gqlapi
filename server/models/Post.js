const { model, Schema } = require("mongoose");
const uuid = require("uuid/v4");

const postSchema = new Schema({
  key: {
    type: String,
    default: uuid(),
  },
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = model("Post", postSchema);