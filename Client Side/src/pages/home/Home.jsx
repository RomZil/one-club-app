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
  const { loading, error, data } = useQuery(GET_DEALS);

  const { state } = useLocation();
  const [categories_filtered, setCategories_filtered] = useState([]);

  const { title } = state;

  useEffect(() => {
    if (data != undefined && title != null && title != "") {
      const tmp = data.getDeals.filter((category) => {
        return category.title.toUpperCase().includes(title.toUpperCase());
      });
      setCategories_filtered(tmp);
    }
    // else {
    //   setCategories_filtered(categories);
    // }
  }, [data, state]);

  if (error) return <p> Somthing wrong</p>;
  if (loading) return <Spinner />;

  return (
    <div>
      <Search title={""} />
      {/* <h1 className="headline">Categories</h1> */}
      <br />
      <Row className="categories" style={{ display: "flex", justifyContent: "center", gridGap: 15 }}>
        {categories_filtered.map((category) => (
          <Item
            key={category.id} // Assign stable key using category.id
            id={category.id}
            img={category.img}
            title={category.title}
            parentId={"1"}
          />
        ))}
      </Row>
    </div>
  );
}
