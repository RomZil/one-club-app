// import "./Profile.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// RefreshDate();

const Profile = () => {
  const [updateName, setNameValue] = useState("");
  const [updateEmail, setEmailValue] = useState("");
  const [updatePassword, setPasswordValue] = useState("");
  const [updateDate, setDateValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // TODO:  call to db and get the data
    setNameValue("unger");
    setEmailValue("adi@gmail.com");
    setPasswordValue("123456");
  }, []);

  function UpdateToDB() {
    navigate("/Home");
    //all the infon in vars
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
      <p>Profile</p>
      <Link to="/MyClubs">Go to your clubs </Link>
      <p>
        Name
        <input
          type="text"
          value={updateName}
          onChange={handleNameChange}
        />{" "}
      </p>
      <p>
        Email
        <input
          type="email"
          value={updateEmail}
          onChange={handleEmailChange}
        />{" "}
      </p>
      <p>
        Password
        <input
          type="password"
          value={updatePassword}
          onChange={handlePasswordChange}
        />{" "}
      </p>
      <p>
        Date
        <input
          type="date"
          value={updateDate}
          onChange={handleDateChange}
        />{" "}
      </p>
      <button className="registerBtn" onClick={UpdateToDB}>
        update profile
      </button>
    </div>
  );
};

export default Profile;
