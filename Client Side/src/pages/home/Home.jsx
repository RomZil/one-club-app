import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Item from "../../components/item/item.jsx";
import { categories } from "../../data/mockData.js";
import { Col, Row } from "react-bootstrap";
import ShowItem from "../ShowItem/ShowItem.jsx";
import Search from "../../components/search/search.jsx";

const Home = () => {
  return (
    <Col>
      {/* <ShowItem img={"k"} name={"temp"}></ShowItem> */}
      <Search title={""} />
      <Row className="categories" style={{ marginLeft: 2, gridGap: 15 }}>
        {categories.map((categorie) => (
          <Item
            key={categorie.id}
            id={categorie.id}
            img={categorie.img}
            name={categorie.name}
            perentId={categorie.perent_id}
          />
        ))}
      </Row>{" "}
    </Col>
  );
};

export default Home;
