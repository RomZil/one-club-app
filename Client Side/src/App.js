import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Search from "./components/search/search";
import Item from "./components/item/item";
import { categories } from "../src/data/mockData.js";
import Users from "./components/users/users"
import { Col, Container, Row } from "react-bootstrap";
import FilteresCategories from "./pages/FilteredCategories/FilteresCategories.jsx";
import { AppRouter } from "./AppRouter";
import { BrowserRouter } from "react-router-dom";


const user = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [business, setBusiness] = useState([]);

  console.log("App " + searchTerm);

  return (
    <ApolloProvider client={user}>
    <BrowserRouter>
      <div className="App">
        <Container className="grid-items">
          <Users />
          <AppRouter />
        </Container>
      </div>
    </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
