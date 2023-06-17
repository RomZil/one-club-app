import "./Welcome.css";
import { useNavigate, Link } from "react-router-dom";
import { AppRouter } from "../../AppRouter";
import startImag from "../../images/Discount.png";
import { useEffect, useState } from "react";
import food from "../../images/cimena.jpg";

const categories = [
  {
    categoryTitle: "category",
    img: food,
  },
  {
    categoryTitle: "category",
    img: food,
  },
  {
    categoryTitle: "category",
    img: food,
  },
  {
    categoryTitle: "category",
    img: food,
  },
  {
    categoryTitle: "category",
    img: food,
  },
  {
    categoryTitle: "category",
    img: food,
  },
  {
    categoryTitle: "category",
    img: food,
  },
];

const items = [
  {
    itemTitle: "item",
    itemDesc: "description",
    img: food,
  },
  {
    itemTitle: "item",
    itemDesc: "description",
    img: food,
  },
  {
    itemTitle: "item",
    itemDesc: "description",
    img: food,
  },
  {
    itemTitle: "item",
    itemDesc: "description",
    img: food,
  },
  {
    itemTitle: "item",
    itemDesc: "description",
    img: food,
  },
  {
    itemTitle: "item",
    itemDesc: "description",
    img: food,
  },
  {
    itemTitle: "item",
    itemDesc: "description",
    img: food,
  },
];

const Welcome = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
  }, []);

  return (
    <div className="welcomeContainer">
      <img className="img" src={startImag} />
      <div className="scrollItems">
        {categories.map((item) => (
          <div className="category">
            <div className="categoryImg"></div>
            <p>{item.categoryTitle}</p>
          </div>
        ))}
      </div>
      <div className="scrollItems2">
        {items.map((item) => (
          <div className="item2">
            <img className="itemImg" src={food}></img>
            <h3>{item.itemTitle}</h3>
            <p>{item.itemDesc}</p>
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
};

export default Welcome;
