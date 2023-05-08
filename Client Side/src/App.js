import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Search from "./components/search/search";
import Item from "./components/item/item";
import { categories } from "../src/data/mockData.js";
import { Col, Container, Row } from "react-bootstrap";
import FilteresCategories from "./pages/FilteredCategories/FilteresCategories.jsx";
import { AppRouter } from "./AppRouter";
import { BrowserRouter } from "react-router-dom";
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [business, setBusiness] = useState([]);

  console.log("App " + searchTerm);

  return (
    <BrowserRouter>
      <div className="App">
        <Container className="grid-items">
          <AppRouter />
        </Container>
      </div>
    </BrowserRouter>
  );
};

export default App;
