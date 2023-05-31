import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Item from "../../components/item/item.jsx";
import { categories } from "../../data/mockData.js";
import { Col, Row } from "react-bootstrap";
import Search from "../../components/search/search.jsx";
import { useLocation } from "react-router-dom";
import "./Home.css";
import BackButton from "../../components/backButton/backButton.jsx";

const Home = () => {
  const { state } = useLocation();
  const [categories_filtered, setCategories_filtered] = useState([]);
  const { title } = state;

  useEffect(() => {
    if (title != null) {
      const tmp = categories.filter((category) => {
        return category.name.includes(title.toUpperCase());
      });
      setCategories_filtered(tmp);
    } else {
      setCategories_filtered(categories);
    }
  }, [state]);

  return (
    <div>
      <Search title={""} />
      <h1 className="headline">Categories</h1>
      <br />
      <Row
        className="categories"
        style={{ display: "flex", justifyContent: "center", gridGap: 15 }}
      >
        {categories_filtered.map((category) => (
          <Item
            key={Math.floor(Math.random() * 100000)} // Assign stable key using category.id
            id={category.id}
            img={category.img}
            name={category.name}
            parentId={category.parent_id}
          />
        ))}
      </Row>
    </div>
  );
};

export default Home;
