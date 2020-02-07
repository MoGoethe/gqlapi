const { checkAuth } = require("../../utils/tools");
const Post = require("../../models/Post");


module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch(e) {
        throw new Error(e);
      }
    },
    async getPost(_, { postKey }) {
      try {
        return await Post.findOne({key: postKey});
      } catch(e) {
        throw new Error(e);
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const authUser = checkAuth(context);
      const {username, id} = authUser
      const newPost = new Post({
        body,
        username,
        user: id,
        createdAt: new Date().toISOString(),
      });
      return await newPost.save();
    },
    async deletePost(_, { postKey }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findOne({key: postKey});
        if (user.username === post.username) {
          await post.delete();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likePost(_, { postKey }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findOne({key: postKey});

      if (post) {
        if (post.likes.find(like => like.username === username)) {
          post.likes = post.likes.filter(like => like.username !== username);
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          });
        }

        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    }
  }
}