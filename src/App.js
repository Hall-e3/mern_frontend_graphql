import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  concat,
  HttpLink,
} from "@apollo/client";
import Routings from "./routes/Routings";
import { AuthProvider } from "./context/auth";


const url = new HttpLink({
  uri: "http://localhost:5000/",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("auth_token");
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  }));
  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, url),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Routings />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
