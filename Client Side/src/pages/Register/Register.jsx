import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import { useEffect, useState } from "react";
import axios from "axios";
import emitter from "../../shared/emitter";
import { Col } from "react-bootstrap";

const Register = () => {
  const [inputName, setNameValue] = useState("");
  const [inputEmail, setEmailValue] = useState("");
  const [inputPassword, setPasswordValue] = useState("");
  const [inputDate, setDateValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setEmailValue("");
    setDateValue("");
    setPasswordValue("");
    setNameValue("");
  }, []);
  function RegisterToDB() {
    if (!inputEmail.includes("@")) alert("The email mast be correct email");
    else {
      try {
        axios
          .post("http://localhost:3000/auth/register", {
            name: inputName,
            email: inputEmail,
            password: inputPassword,
          })
          .then((response) => {
            if (response.status == 200) {
              localStorage.setItem("isLoggedIn", true);
              localStorage.setItem("token", response.data.accessToken);
              navigate("/Home", { state: { title: null } });
              window.location.reload();
            }
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      } catch (error) {
        alert("Somthing roung, try again");
      }
    }
  }

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };
  const handleDateChange = (event) => {
    setDateValue(event.target.value);
  };

  return (
    <div className="page">
      <div id="container">
        <p id="titel2">Sign Up</p>
        <div id="container_all_input">
          <div id="container_input">
            <div id="text_input">Name</div>
            <input
              className="input"
              type="text"
              value={inputName}
              onChange={handleNameChange}
            />
          </div>
          <div id="container_input">
            <div id="text_input">Email</div>
            <input
              className="input"
              type="email"
              value={inputEmail}
              onChange={handleEmailChange}
            />
          </div>
          <div id="container_input">
            <div id="text_input">Password</div>
            <input
              className="input"
              type="password"
              value={inputPassword}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        <button id="b_sign" className="registerBtn" onClick={RegisterToDB}>
          Register
        </button>
      </div>
      <Link className="link2" to="/LogIn">
        Already Registered? Log in here{" "}
      </Link>
    </div>
  );
};
export default Register;
