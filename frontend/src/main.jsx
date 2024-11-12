import "./index.css";
import App from "./App.jsx";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import GridBackground from "./components/ui/GridBackground.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  //TODO: update the uri on production
  uri: "http://localhost:4000/graphql", //URL of GraphQL server
  cache: new InMemoryCache(), //Apollo client uses to cache query results after fetching them
  credentials: "include", //This tells Apollo Client to send cookies along with every request to the server
});

createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <GridBackground>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </GridBackground>
  </BrowserRouter>
  // </React.StrictMode>
);
