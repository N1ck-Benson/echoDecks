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
  uri: "postgres://zpyujmlaimtwmm:af9552ddcf0ad6d2dc085af3dbac9d82cd3acc7355f5a73f208cb1d193bf98f1@ec2-3-218-71-191.compute-1.amazonaws.com:5432/d33001hvqck46n",
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
