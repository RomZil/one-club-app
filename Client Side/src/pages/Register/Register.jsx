import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import { useEffect, useState } from "react";
import axios from "axios";
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
    axios
      .post("controllers/register", {
        email: inputEmail,
        password: inputPassword,
      })
      .then((response) => {
        console.log(response);
      });
    navigate("/Home");
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
    <div id="container">
      <p id="titel2">Create a new accounte</p>
      <Link to="/LogIn">Already Register? Log in here </Link>
      <div id="container_all_input">
        <div id="container_input">
          <p id="text_input">Name</p>
          <input
            id="input"
            type="text"
            value={inputName}
            onChange={handleNameChange}
          />
        </div>
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
        <div id="container_input">
          <p id="text_input">Date</p>
          <input
            id="input"
            type="date"
            value={inputDate}
            onChange={handleDateChange}
          />
        </div>
      </div>
      <button id="b_sign" className="registerBtn" onClick={RegisterToDB}>
        Register
      </button>
    </div>
  );
};
export default Register;
