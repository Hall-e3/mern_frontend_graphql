import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Routings from "./routes/Routings";
import { AuthProvider } from "./context/auth";

const client = new ApolloClient({
  uri: "http://localhost:5000/",
  cache: new InMemoryCache(),
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
