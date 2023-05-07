import "./Welcome.css";
import { useNavigate, Link } from "react-router-dom";
import { AppRouter } from "../../AppRouter";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div id="welcomeContainer">
      <button
        id="B_welcome"
        onClick={() => {
          navigate("/LogIn");
        }}
      >
        start now
      </button>
      <Link to={"/Register"}>not registered? sign up now</Link>
    </div>
  );
};

export default Welcome;
