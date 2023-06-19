import "./Welcome.css";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { AppRouter } from "../../AppRouter";
import startImag from "../../images/Discount.png";
import { useEffect, useState } from "react";
import food from "../../images/cimena.jpg";
import { useMutation, useQuery } from "@apollo/client";
import { GET_POP_CATEGORIES } from "../../components/queries/categoryQueries";
import { GET_POP_DEALS } from "../../components/queries/dealQueries";
import {
  INCREASE_POPULAR_CATEGORY,
  INCREASE_POPULAR_DEAL,
} from "../../components/mutations/userMutations";

export default function Welcome() {
  const [increasePopularCategory] = useMutation(INCREASE_POPULAR_CATEGORY);
  const [increasePopularDeal] = useMutation(INCREASE_POPULAR_DEAL);

  const {
    loading: loadingAll,
    error: errorAll,
    data: dataAll,
  } = useQuery(GET_POP_CATEGORIES);

  const {
    loading: loadingDeals,
    error: errorDeals,
    data: dataDeals,
  } = useQuery(GET_POP_DEALS);

  const [allCategories, setAllCategories] = useState([]);
  const [deals, setDeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (dataAll != undefined) {
      setAllCategories(dataAll.getPopularCategories);
      console.log("all ", dataAll.getPopularCategories);
    }
  }, [dataAll]);

  useEffect(() => {
    if (dataDeals != undefined) {
      setDeals(dataDeals.getPopularDeals);
      console.log("all getDeals ", dataDeals.getPopularDeals);
    }
  }, [dataDeals]);

  return (
    <div className="welcomeContainer">
      <img className="img" src={startImag} />
      <div className="scrollItems">
        {allCategories.map((item) => (
          <div
            key={item.id}
            className="category"
            onClick={() => {
              var id = item.id;
              navigate("/FilteresCategories", { state: { id: item.id } });
              increasePopularCategory({ variables: { id } });
            }}
          >
            <img
              className="categoryImg"
              // src={require(`../../images/CategoryImages/${item.name}.png`)}
            />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <div className="divTitle">
        <h2 className="h2ForYou">Hot Right Now</h2>
      </div>
      <div className="scrollItems2">
        {deals.map((item) => (
          <div
            key={item.id}
            className="item2"
            onClick={() => {
              var id = item.id;
              console.log(id);
              navigate("/ShowItem", { state: { id } });
              increasePopularDeal({ variables: { id } });
            }}
          >
            <img className="itemImg" src={item ? item.imageURL : ""}></img>
            <h3>{item.title ? item.title : ""}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
