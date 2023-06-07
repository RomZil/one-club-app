import "./LogIn.css";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import emitter from "../../shared/emitter";
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

  async function checkIfRegister() {
    try {
      axios
        .post("http://localhost:3000/auth/login", {
          email: inputEmail,
          password: inputPassword,
        })
        .then((response) => {
          console.log("res " + response.data);
          if (response.status == 200) {
            emitter.emit("isLoggedIn", true);
            navigate("/Home", { state: { title: null } });
          }
        })
        .catch((error) => {
          console.log("Error:", error.response.data); // Print the error message from the server
          alert(error.response.data.message);
        });
    } catch (error) {
      alert("Somthing roung, try again");
    }
    // emitter.emit("isLoggedIn", true);
  }

  return (
    <div>
      <div id="container">
        <p id="titel2">Login</p>
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
          <br />
          <div id="container_input">
            <div id="text_input">Password</div>
            <input
              className="input"
              type="password"
              value={inputPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <Link className="link2" to="/ForgotPassword">
            Forgot password?
          </Link>
        </div>
        <br />
        <button id="b_sign" className="registerBtn" onClick={checkIfRegister}>
          Log In
        </button>
      </div>
      <Link className="link2" to="/Register">
        Not registered? sign up now
      </Link>
    </div>
  );
};
export default LogIn;
