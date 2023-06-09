import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Search from "./components/search/search";
import Item from "./components/item/item";
// import { categories } from "../src/data/mockData.js";
import Users from "./components/users/users";
import { Col, Container, Row } from "react-bootstrap";
// import FilteresCategories from "./pages/FilteredCategories/FilteresCategories.jsx";
import { AppRouter } from "./AppRouter";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/footer/footer";

const user = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("App " + searchTerm);

  // localStorage.setItem("isLoggedIn", false);

  return (
    <>
      <BrowserRouter>
        <Footer />
        <ApolloProvider client={user}>
          <div className="App">
              <AppRouter />
          </div>
        </ApolloProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
