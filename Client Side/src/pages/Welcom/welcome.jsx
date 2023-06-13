import "./Welcome.css";
import { useNavigate, Link } from "react-router-dom";
import { AppRouter } from "../../AppRouter";
import startImag from "../../images/Object.png";
import { useEffect, useState } from "react";

const Welcome = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
  }, []);

  return (
    <div id="welcomeContainer">
      <img className="img" src={startImag} />
      <br />
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
      {!isLoggedIn && (
        <Link className="notRegLink link2" to={"/Register"}>
          not registered? sign up now
        </Link>
      )}
    </div>
  );
};

export default Welcome;
