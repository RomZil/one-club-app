import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Search from "./components/search/search";
import Item from "./components/item/item";
import { categories } from "../src/data/mockData.js";
import Clients from "./components/clients"
import { Col, Container, Row } from "react-bootstrap";


const client = new ApolloClient({
  uri: 'http://http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [business, setBusiness] = useState([]);

  console.log("App " + searchTerm);

  return (
    <div className="App" style={{ backgroundColor: "darkgrey" }}>
      <Search title={searchTerm} />
      <Container className="grid-items">
        <Col>
          <Row className="categories" style={{ marginLeft: 2, gridGap: 15 }} >
            {categories.map((categorie) => (
              <Item
                key={categorie.id}
                img={categorie.img}
                name={categorie.name}
                perentId={categorie.perent_id}
              />
            ))}
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default App;
