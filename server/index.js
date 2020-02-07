const {ApolloServer, gql} = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req})
});

mongoose.connect("mongodb://localhost:27017/tsrestfulapi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("database connected!");
  return server.listen({port: 7001 });
}).then(res => console.log("server running at port 7001"));


