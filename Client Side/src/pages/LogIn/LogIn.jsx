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

  async function checkIfRegister() {
    try {
      axios
        .post("http://localhost:3000/auth/login", {
          email: inputEmail,
          password: inputPassword,
        })
        .then((response) => {
          debugger;
          console.log("res" + response);
          if (response.status == 200) {
            emitter.emit('isLoggedIn', data);
            navigate("/Home");
          }
        })
        .catch((error) => {
          debugger;
          console.log("Error:", error.response.data); // Print the error message from the server
          alert(error.response.data.message);
        });
    } catch (error) {
      debugger;
      alert("Somthing roung, try again");
    }
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
