import React from "react";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import App from './App';

const httpLink = createHttpLink({
  uri: "http://localhost:7001/graphql"
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)