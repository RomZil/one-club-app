import "./ForgotPassword.css";

import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Col } from "react-bootstrap";

const ForgotPassword = () => {
  const [inputEmail, setEmailValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setEmailValue("");
  }, []);

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  function sendEmail() {
    axios
      .post("", {
        email: inputEmail,
      })
      .then((response) => {
        console.log(response);
      });
    navigate("/Home");
  }

  return (
    <div>
      <div id="container">
        <p id="titel2">Forgot Password</p>
        <p id="titel3">new password</p>
        <div id="container_all_input">
          <div id="container_input">
            <div id="text_input">Email</div>
            <input
              id="input"
              type="email"
              value={inputEmail}
              onChange={handleEmailChange}
            />
          </div>
        </div>
        <button id="b_sign" className="registerBtn" onClick={sendEmail}>
          send
        </button>
      </div>
    </div>
  );
};
export default ForgotPassword;
