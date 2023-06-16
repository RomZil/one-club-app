import "./Welcome.css";
import { useNavigate, Link } from "react-router-dom";
import { AppRouter } from "../../AppRouter";
import startImag from "../../images/Discount.gif";
import { useEffect, useState } from "react";
import RandomItemCard from "../../components/random-item-card/random-item-card";
import ItemWelcome from "../../components/item-welcome/item-welcome";
import { Row } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../components/queries/categoryQueries";
import Spinner from "../../components/spinner/spinner";
import { GET_DEALS } from "../../components/queries/dealQueries";

export default function Welcome() {
  const {
    loading: loadingAll,
    error: errorAll,
    data: dataAll,
  } = useQuery(GET_CATEGORIES);

  const {
    loading: loadingDeals,
    error: errorDeals,
    data: dataDeals,
  } = useQuery(GET_DEALS);

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [randomObject, setRandomObject] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
  }, []);

  useEffect(() => {
    if (dataAll != undefined) {
      setAllCategories(dataAll.getCategories);
      console.log("all ", dataAll.getCategories);
    }
  }, [dataAll]);

  useEffect(() => {
    if (dataDeals != undefined) {
      setDeals(dataDeals.getDeals);
      console.log("all getDeals ", dataDeals.getDeals);
    }
  }, [dataDeals]);

  useEffect(() => {
    // Randomly select an object every 10 seconds
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * deals.length);
      const randomObj = deals[randomIndex];
      setRandomObject(randomObj);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // if (errorAll) return <p> Somthing wrong</p>;
  // if (loadingAll ) return <Spinner />;

  return (
    <div id="welcomeContainer">
      {/* 
      {!isLoggedIn && (
        <Link className="notRegLink link2" to={"/Register"}>
          not registered? sign up now
        </Link>
      )} */}
      <div className="titles">Hot Right Now</div>
      <RandomItemCard item={randomObject} />
      <div className="categoriesInRow">
        <div className="titles">What are you lookig for?</div>
        <Row
          className="categoriesScroll"
          style={{ display: "flex", justifyContent: "center", gridGap: 15 }}
        >
          {allCategories.map((category) => (
            <ItemWelcome
              key={category.id}
              id={category.id}
              img={`../../images/CategoryImages/${category.name}.png`}
              title={category.name}
              parentId={null}
            />
          ))}
        </Row>
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
