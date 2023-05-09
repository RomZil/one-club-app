import "./PorgotPassword.css";

import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Col } from "react-bootstrap";

const PorgotPassword = () => {
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
        <p id="titel2">Porgot Password</p>
        <p id="titel3">new password</p>
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
        </div>
        <button id="b_sign" className="registerBtn" onClick={sendEmail}>
          send
        </button>
      </div>
    </div>
  );
};
export default PorgotPassword;
