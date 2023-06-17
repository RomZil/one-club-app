import "./Welcome.css";
import { useNavigate, Link } from "react-router-dom";
import { AppRouter } from "../../AppRouter";
import startImag from "../../images/Discount.png";
import { useEffect, useState } from "react";
import food from "../../images/cimena.jpg";
import { useQuery } from "@apollo/client";
import { GET_POP_CATEGORIES } from "../../components/queries/categoryQueries";
import { GET_POP_DEALS } from "../../components/queries/dealQueries";

export default function Welcome() {
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

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
  }, []);

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
          <div key={item.id} className="category">
            <img
              className="categoryImg"
              src={require(`../../images/CategoryImages/${item.name}.png`)}
            />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <div className="divTitle">
        <h2 className="h2ForYou">מומלץ עבודך</h2>
      </div>
      <div className="scrollItems2">
        {deals.map((item) => (
          <div key={item.id} className="item2">
            <img className="itemImg" src={item.imageURL}></img>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <button
        id="B_welcome"
        onClick={() => {
          JSON.parse(localStorage.getItem("isLoggedIn"))
            ? navigate("/Home", { state: { title: null } })
            : navigate("/LogIn");
        }}
      >
        start now
      </button>
    </div>
  );
}
