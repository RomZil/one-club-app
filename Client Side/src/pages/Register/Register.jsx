import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import { useState } from "react";

const Register = () => {
  const [inputName, setNameValue] = useState("");
  const [inputEmail, setEmailValue] = useState("");
  const [inputPassword, setPasswordValue] = useState("");
  const [inputDate, setDateValue] = useState("");
  const navigate = useNavigate();

  function RegisterToDB() {
    //Todo: save the info in DB
    //Todo: save userName in local DB
    //all the infon in vars
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
      <p id="first">Create a new accounte</p>
      <Link to="/LogIn">Already Register? Log in here </Link>
      <p>
        Name <input type="text" value={inputName} onChange={handleNameChange} />{" "}
      </p>
      <p>
        Email{" "}
        <input type="email" value={inputEmail} onChange={handleEmailChange} />{" "}
      </p>
      <p>
        Password{" "}
        <input
          type="password"
          value={inputPassword}
          onChange={handlePasswordChange}
        />{" "}
      </p>
      <p>
        Date <input type="date" value={inputDate} onChange={handleDateChange} />{" "}
      </p>
      <button className="registerBtn" onClick={RegisterToDB}>
        Register
      </button>
    </div>
  );
};
export default Register;
