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
import emitter from "../../shared/emitter";

export default function Home() {
  const {
    loading: loadingAll,
    error: errorAll,
    data: dataAll,
  } = useQuery(GET_CATEGORIES);
  const {
    loading: loadingByUser,
    error: errorByUser,
    data: dataByUser,
  } = useQuery(GET_CATEGORIES_BY_USER);

  const { state } = useLocation();
  const [categories_filtered, setCategories_filtered] = useState([]);

  useEffect(() => {
    // Listening to the event
    const listener = (isMyClubs) => {
      if (!isMyClubs) {
        if (dataByUser != undefined) {
          setCategories_filtered(dataByUser.getCategoriesByUser);
          console.log("user", dataByUser.getCategoriesByUser);
        }
      } else if (dataAll != undefined) {
        setCategories_filtered(dataAll.getCategories);
        console.log("all ", dataAll.getCategories);
      }
    };

    emitter.on("isMyClubs", listener);

    return () => {
      // Unsubscribing from the event when component unmounts
      emitter.off("isMyClubs", listener);
    };
  }, [state, dataAll, dataByUser]);

  if (errorAll || errorByUser) return <p> Somthing wrong</p>;
  if (loadingAll || loadingByUser) return <Spinner />;

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
            key={category.id}
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
