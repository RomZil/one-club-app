import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Item from "../../components/item/item.jsx";
import { categories } from "../../data/mockData.js";
import { Col, Row } from "react-bootstrap";
import ShowItem from "../ShowItem/ShowItem.jsx";
import Search from "../../components/search/search.jsx";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { state } = useLocation();

  const [categories_filtered, setCategories_filtered] = useState([]);

  useEffect(() => {
    if (state != null) {
      const { filter } = state;
      setCategories_filtered(
        categories.filter((categorie) => categorie.name == "SPA")
        // categories.filter((categorie) => categorie.name != "")
      );
      console.log(categories_filtered);
    } else {
      setCategories_filtered(categories);
    }
  }, []);

  return (
    <div>
      {/* <ShowItem img={"k"} name={"temp"}></ShowItem> */}
      <Search title={""} />
      <Row
        className="categories"
        style={{ display: "flex", justifyContent: "center", gridGap: 15 }}
      >
        {categories_filtered.map((categorie) => (
          <Item
            key={categorie.id}
            id={categorie.id}
            img={categorie.img}
            name={categorie.name}
            perentId={categorie.perent_id}
          />
        ))}
      </Row>
    </div>
  );
};

export default Home;
