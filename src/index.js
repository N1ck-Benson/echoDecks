import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

// httpLink connects the ApolloClient instance
// with the echoDecks API; server uri should be
// that of the API
const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_URI,
  credentials: "same-origin",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
