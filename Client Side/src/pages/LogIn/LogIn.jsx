import "./LogIn.css";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Col } from "react-bootstrap";

const LogIn = () => {
  const [inputEmail, setEmailValue] = useState("");
  const [inputPassword, setPasswordValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setEmailValue("");
    setPasswordValue("");
  }, []);

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  function checkIfRegister() {
    axios
      .post("", {
        email: inputEmail,
        password: inputPassword,
      })
      .then((response) => {
        console.log(response);
      });
    navigate("/Home");
  }

  return (
    <div>
      <div id="container">
        <p id="titel2">Login</p>
        <p id="titel3">sign in to continue </p>
        <div id="container_all_input">
          <div id="container_input">
            <p id="text_input">Email</p>
            <input
              id="input"
              type="email"
              value={inputEmail}
              onChange={handleEmailChange}
            />
          </div>
          <div id="container_input">
            <p id="text_input">Password</p>
            <input
              id="input"
              type="password"
              value={inputPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <Link id="link" to="/PorgotPassword">
            Forgot password?
          </Link>
        </div>
        <button id="b_sign" className="registerBtn" onClick={checkIfRegister}>
          Log In
        </button>
      </div>
      <Link id="link2" to="/Register">
        Not registered? sign in now
      </Link>
    </div>
  );
};
export default LogIn;
