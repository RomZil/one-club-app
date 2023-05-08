import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Item from "../../components/item/item.jsx";
import { categories } from "../../data/mockData.js";
import { Col, Row } from "react-bootstrap";
import ShowItem from "../ShowItem/ShowItem.jsx";
import Search from "../../components/search/search.jsx";
import { useLocation } from "react-router-dom";

const Home = (filter) => {
  // const { state } = useLocation();
  // const { filter } = state;
  const [categories_filtered, setCategories_filtered] = useState([]);

  useEffect(() => {
    if (filter != "all") {
      setCategories_filtered(
        // categories.filter((categorie) => categorie.name == "SPA")
        categories.filter((categorie) => categorie.name != "")
      );
    }
    debugger;
  }, []);

  return (
    <Col>
      {/* <ShowItem img={"k"} name={"temp"}></ShowItem> */}
      <Search title={""} />
      <Row className="categories" style={{ marginLeft: 2, gridGap: 15 }}>
        {categories_filtered.map((categorie) => (
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
