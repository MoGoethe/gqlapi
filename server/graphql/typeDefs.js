const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    key: String!
    body: String!
    createdAt: String!
    username: String!
    user: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }

  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }


  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
    token: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type Query {
    getPosts: [Post],
    getPost(postKey: String!): Post!,
  }

  type Mutation {
    register(registerInput: RegisterInput): User!,
    login(loginInput: LoginInput): User!,
    createPost(body: String!): Post!,
    deletePost(postKey: String!): Post,
    createComment(postKey: String!, body: String!): Post!,
    deleteComment(postKey: String!, commentId: ID!): Post!,
    likePost(postKey: String!): Post!,
  }
`;