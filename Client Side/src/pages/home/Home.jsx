import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Item from "../../components/item/item.jsx";
import { Row } from "react-bootstrap";
import Search from "../../components/search/search.jsx";
import { useLocation } from "react-router-dom";
import "./Home.css";
import {
  GET_CATEGORIES,
  GET_CATEGORIES_BY_USER,
} from "../../components/queries/categoryQueries.js";
import { useQuery } from "@apollo/client";
import Spinner from "../../components/spinner/spinner.jsx";

export default function Home() {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const {
    loading: loadingByUser,
    error: errorByUser,
    data: dataByUser,
  } = useQuery(GET_CATEGORIES_BY_USER);

  const { state } = useLocation();
  const [categories_filtered, setCategories_filtered] = useState([]);
  const {isMyClubs} = state || {};

  useEffect(() => {
    if (isMyClubs) {
      if (dataByUser != undefined) {
        setCategories_filtered(dataByUser.getCategoriesByUser);
      }
    } else if (data != undefined) {
      setCategories_filtered(data.getCategories);
    }
  }, [isMyClubs , state]);

  if (error || errorByUser) return <p> Somthing wrong</p>;
  if (loading || loadingByUser) return <Spinner />;

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
            key={category.id} // Assign stable key using category.id
            id={category.id}
            img={category.img}
            title={category.name}
            parentId={null}
          />
        ))}
      </Row>
    </div>
  );
}
