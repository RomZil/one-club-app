import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Item from "../../components/item/item.jsx";
import { categories } from "../../data/mockData.js";
import { Col, Row } from "react-bootstrap";
import Search from "../../components/search/search.jsx";
import { useLocation } from "react-router-dom";
import "./Home.css";
import BackButton from "../../components/backButton/backButton.jsx";
import { Deals } from "../../shared/deals.jsx";
import { GET_DEALS } from "../../components/queries/dealQueries.js";
import { useQuery } from "@apollo/client";
import Spinner from "../../components/spinner/spinner.jsx";

export default function Home() {
  const { isLoading, error, data } = useQuery(GET_DEALS);

  const { state } = useLocation();
  const [categories_filtered, setCategories_filtered] = useState([]);
  const { title } = state;

  // const data = Deals();
  useEffect(() => {
    if (data != undefined && title != null) {
      console.log(data);
      const tmp = data.deals.filter((category) => {
        return category.title.includes(title.toUpperCase());
      });
      setCategories_filtered(tmp);
    } else {
      setCategories_filtered(categories);
    }
  }, [data, state]);

  if (error) return <p> Somthing wrong</p>;

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
}
