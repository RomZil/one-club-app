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
    try {
      axios
        .post("http://localhost:3000/auth/register", {
          name: inputName,
          email: inputEmail,
          password: inputPassword,
        })
        .then((response) => {
          if (response.status == 200) {
            navigate("/Home", { state: "" });
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } catch (error) {
      alert("Somthing roung, try again");
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
    <div id="container">
      <p id="titel2">Sign Up</p>
      <div id="container_all_input">
        <div id="container_input">
          <div id="text_input">Name</div>
          <input className="input" type="text" value={inputName} onChange={handleNameChange} />
        </div>
        <br />
        <div id="container_input">
          <div id="text_input">Email</div>
          <input className="input" type="email" value={inputEmail} onChange={handleEmailChange} />
        </div>
        <br />
        <div id="container_input">
          <div id="text_input">Password</div>
          <input className="input" type="password" value={inputPassword} onChange={handlePasswordChange} />
        </div>
        <br />
        <div id="container_input">
          <div id="text_input">Date</div>
          <input
            className="input custom-date-input"
            type="date"
            value={inputDate}
            onChange={handleDateChange}
            placeholder=""
          />
        </div>
      </div>
      <br />
      <button id="b_sign" className="registerBtn" onClick={RegisterToDB}>
        Register
      </button>
      <br />
      <Link className="link2" to="/LogIn">
        Already Registered? Log in here{" "}
      </Link>
    </div>
  );
};
export default Register;
