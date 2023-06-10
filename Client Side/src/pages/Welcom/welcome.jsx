import "./Welcome.css";
import { useNavigate, Link } from "react-router-dom";
import { AppRouter } from "../../AppRouter";
import startImag from "../../images/Object.png";

const Welcome = () => {
  const navigate = useNavigate();

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
          //todo!!!!! change to login
          // navigate("/Home", { state: { title: null } });
        }}
      >
        start now
      </button>
      <Link className="notRegLink link2" to={"/Register"}>
        not registered? sign up now
      </Link>
    </div>
  );
};

export default Welcome;
