import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import Search from "./components/search/search";
import Item from "./components/item/item";
// import { categories } from "../src/data/mockData.js";
import Users from "./components/users/users";
import { Col, Container, Row } from "react-bootstrap";
// import FilteresCategories from "./pages/FilteredCategories/FilteresCategories.jsx";
import { AppRouter } from "./AppRouter";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/footer/footer";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const user = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMyClubs, setIsMyClubs] = useState(true);

  console.log("App " + searchTerm);

  // localStorage.setItem("isLoggedIn", false);

  return (
    <div className="App">
      <BrowserRouter>
        <Footer setIsMyClubs={setIsMyClubs} isMyClubs={isMyClubs} />
        <ApolloProvider client={user}>
          {/* <div> */}
          {/* <Container className="grid-items"> */}
          <AppRouter isMyClubs={isMyClubs} />
          {/* </Container> */}
          {/* </div> */}
        </ApolloProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
