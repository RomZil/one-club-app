import "./Welcome.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import startImag from "../../images/Discount.png";
import { useMutation, useQuery } from "@apollo/client";
import { GET_POP_CATEGORIES } from "../../components/queries/categoryQueries";
import { GET_POP_DEALS } from "../../components/queries/dealQueries";
import {
  INCREASE_POPULAR_CATEGORY,
  INCREASE_POPULAR_DEAL,
} from "../../components/mutations/userMutations";

const defaultCategoryImage =
  require("../../images/CategoryImages/שונה.png").default;

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

  function setUrl(name) {
    try {
      const res = require(`../../images/CategoryImages/${name}.png`);
      return res;
    } catch (e) {
      const res = require("../../images/CategoryImages/שונה.png");
      return res;
    }
  }

  useEffect(() => {
    if (dataAll !== undefined) {
      setAllCategories(dataAll.getPopularCategories);
      console.log("all ", dataAll.getPopularCategories);
    }
  }, [dataAll]);

  useEffect(() => {
    if (dataDeals !== undefined) {
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
              src={setUrl(item.name)}
              // {require(`../../images/CategoryImages/${item?.name}.png`)}
              // onError={(e) => {
              //   e.target.src = defaultCategoryImage;
              // }}
            />
            <p>{item?.name}</p>
          </div>
        ))}
      </div>
      <div className="divTitle">
        <h2 className="h2ForYou">Hot Right Now</h2>
      </div>
      <div className="scrollItems2">
        {deals.map((item) => (
          <div
            key={item?.id}
            className="item2"
            onClick={() => {
              var id = item.id;
              console.log(id);
              navigate("/ShowItem", { state: { id } });
              increasePopularDeal({ variables: { id } });
            }}
          >
            <img
              className="itemImg"
              src={item?.imageURL}
              onError={(e) => {
                e.target.src = defaultCategoryImage; // Put your default image here
              }}
            />
            <h3>{item?.title}</h3>
            <p>{item?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
