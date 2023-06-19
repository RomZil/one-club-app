import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Item from "../../components/item/item.jsx";
import { Row } from "react-bootstrap";
import Search from "../../components/search/search.jsx";
import { useLocation } from "react-router-dom";
import "./Home.css";
import "../../images/CategoryImages/ביגוד והנעלה.png";
import {
  GET_CATEGORIES,
  GET_CATEGORIES_BY_USER,
} from "../../components/queries/categoryQueries.js";
import { useQuery } from "@apollo/client";
import Spinner from "../../components/spinner/spinner.jsx";

export default function Home({ isMyClubs }) {
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

  useEffect(() => {}, []);

  useEffect(() => {
    if (isMyClubs) {
      if (dataByUser != undefined) {
        setCategories_filtered(dataByUser.getCategoriesByUser);
        console.log("user", dataByUser.getCategoriesByUser);
      }
    } else if (dataAll != undefined) {
      setCategories_filtered(dataAll.getCategories);
      console.log("all ", dataAll.getCategories);
    }
  }, [state, dataAll, dataByUser, isMyClubs]);

  if (errorAll || errorByUser) return <p> Somthing wrong</p>;
  if (loadingAll || loadingByUser) return <Spinner />;

  return (
    <div className="home">
      <Search title={""} />
      <h1 className="headline">Categories</h1>
      <div>
        {categories_filtered.length > 0 ? (
          <Row
            className="categories"
            style={{
              display: "flex",
              justifyContent: "center",
              gridGap: 15,
              paddingBottom: "20px",
            }}
          >
            {categories_filtered.map((category) => (
              <Item
                key={category.id}
                id={category.id}
                img={require("../../images/CategoryImages/שונה.png")}
                // img={require("../../images/CategoryImages/${category.name}.png")}
                title={category.name}
                parentId={null}
              />
            ))}
          </Row>
        ) : (
          <>
            <p> Oops! there is noting to show here... </p>
            <p>Please check your loyalty cards subscription </p>
          </>
        )}
      </div>
    </div>
  );
}
