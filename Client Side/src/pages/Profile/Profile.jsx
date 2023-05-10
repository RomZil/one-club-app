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
      <p id="titel2">Profile</p>
      <Link id="link1" to="/MyClubs">
        Go to your clubs
      </Link>
      <div id="container_all_input">
        <div id="container_input">
          <div id="text_input">Name</div>
          <input
            className="input_w"
            type="text"
            value={updateName}
            onChange={handleNameChange}
          />
        </div>
        <br />
        <div id="container_input">
          <div id="text_input">Email</div>
          <input
            className="input_w"
            type="email"
            value={updateEmail}
            onChange={handleEmailChange}
          />
        </div>
        <br />
        <div id="container_input">
          <div id="text_input">Password</div>
          <input
            className="input_w"
            type="password"
            value={updatePassword}
            onChange={handlePasswordChange}
          />
        </div>
        <br />
        <div id="container_input">
          <div id="text_input">Date</div>
          <input
            className="input_w"
            type="date"
            value={updateDate}
            onChange={handleDateChange}
          />
        </div>
      </div>
      <button id="b_sign" onClick={UpdateToDB}>
        update profile
      </button>
    </div>
  );
};

export default Profile;
