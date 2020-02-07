const { model, Schema } = require("mongoose");
const uuid = require("uuid/v4");

const addressSchema = new Schema({
  city: String,
  street: String,
})

const userSchema = new Schema({
  key: {
    type: String,
    default: uuid(),
  },
  username: {
    type: String,
    required: [true, "Username must not be empty"],
    minlength: [3, "Username must be at least 6 characters long"]
  },
  email: {
    type: String,
    trim: true,
    // validate: {
    //   validator: isEmail
    // }
    match: /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
  },
  password: String,
  role: {
    type: String,
    enum: ["basic", "admin"],
    default: "basic"
  },
  createdAt: String,
  address: {
    type: [addressSchema]
  },
  like_posts: [{
    type: Schema.Types.ObjectId,
    ref: "Post",
  }]
}, {timestamps: true});

module.exports = model("User", userSchema);