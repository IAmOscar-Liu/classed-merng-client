import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
// import { ApolloProvider } from "react-apollo";
// import { createHttpLink } from 'apollo-link-http';
import { setContext } from "apollo-link-context";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const uri =
  process.env.NODE_ENV === "production"
    ? "https://api.gofasthorse.com"
    : "http://localhost:5000";

const httpLink: any = createHttpLink({
  // uri: "http://localhost:5000",
  uri,
});

const authLink: any = setContext(() => {
  const token = localStorage.getItem(process.env.REACT_APP_JWT_TOKEN as string);
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  credentials: "include",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// ReactDOM.render(
//   <React.StrictMode>
//     <TestDiv />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
