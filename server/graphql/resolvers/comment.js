const Post = require("../../models/Post");
const { checkAuth } = require("../../utils/tools");
const { UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    createComment: async (_, { postKey, body }, context) => {
      const { username } = checkAuth(context);

      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not empty"
          }
        });
      }

      const post = await Post.findOne({key: postKey});

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        });

        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
    deleteComment: async (_, { postKey, commentId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findOne({key: postKey});

      if (post) {
        const commentIndex = post.comments.findIndex(c => c.id === commentId);

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    }
  }
};