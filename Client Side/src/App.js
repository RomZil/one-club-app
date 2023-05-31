import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Search from "./components/search/search";
import Item from "./components/item/item";
import { categories } from "../src/data/mockData.js";
import Clients from "./components/clients";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Route, Link, Routes, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import FilteresCategories from "./pages/FilteredCategories/FilteresCategories.jsx";
import { AppRouter } from "./AppRouter";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/footer/footer";
import BackButton from "./components/backButton/backButton";

const client = new ApolloClient({
  uri: "http://http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("App " + searchTerm);

  return (
    <>
      <Footer />

      <br />
      <BrowserRouter>
        <div className="App">
          <Container className="grid-items">
            <AppRouter>
              {/* <BackButton /> */}
              {!isLoggedIn && (
                <>
                  <BackButton />
                </>
              )}
            </AppRouter>
          </Container>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
