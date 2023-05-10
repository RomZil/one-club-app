import "./LogIn.css";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import emitter from '../../shared/emitter';
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
    let data = true;
    emitter.emit('isLoggedIn', data);
    // axios
    //   .post("", {
    //     email: inputEmail,
    //     password: inputPassword,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     // TODO: if ok then set in the footer component isHamburger = true;
    //     emitter.emit('isLoggedIn', true);
    //   });
    // navigate("/Home");
  }

  return (
    <div>
      <div id="container">
        <p id="titel2">Login</p>
        <p id="titel3">sign in to continue </p>
        <div id="container_all_input">
          <div id="container_input">
            <div id="text_input">Email</div>
            <input
              className="input"
              type="email"
              value={inputEmail}
              onChange={handleEmailChange}
            />
          </div>
          <br></br>
          <div id="container_input">
            <div id="text_input">Password</div>
            <input
              className="input"
              type="password"
              value={inputPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <Link id="link" to="/ForgotPassword">
            Forgot password?
          </Link>
        </div>
        <button id="b_sign" className="registerBtn" onClick={checkIfRegister}>
          Log In
        </button>
      </div>
      <Link id="link2" to="/Register">
        Not registered? sign up now
      </Link>
    </div>
  );
};
export default LogIn;
