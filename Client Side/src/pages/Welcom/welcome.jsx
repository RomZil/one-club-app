import "./Welcome.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  function OnClickWelcome() {
    navigate("/Home");
  }
  return (
    <div id="welcomeContainer">
      <button onClick={OnClickWelcome}>welcom</button>
    </div>
  );
};

export default Welcome;
