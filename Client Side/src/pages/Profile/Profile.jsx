// import "./Profile.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GET_USER, GET_USERS } from "../../components/queries/userQueries";
import { useQuery } from "@apollo/client";
import Spinner from "../../components/spinner/spinner";

// RefreshDate();

const Profile = () => {
  const [updateName, setNameValue] = useState("");
  const [updateEmail, setEmailValue] = useState("");
  const [updatePassword, setPasswordValue] = useState("");
  const [updateDate, setDateValue] = useState("");
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_USER);

  console.log("data" , data);
  useEffect(() => {
    if (data != undefined) {
      setNameValue(data.getUser.name);
      setEmailValue(data.getUser.email);
      setPasswordValue(data.getUser.password);
    }
  }, [data]);

  if (error) return <p>{error.message}</p>;
  if (loading) return <Spinner />;

  function UpdateToDB() {
    navigate("/Home", { state: "" });

    //all the infon in vars
  }

  function NavMyClub() {
    navigate("/MyClubs", { state: {regMyClubs: data.getUser.loyaltyCardId} });
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
      <div id="container_all_input">
        <div id="container_input">
          <div id="text_input">Name</div>
          <input className="input_w" type="text" value={updateName} onChange={handleNameChange} />
        </div>
        <br />
        <div id="container_input">
          <div id="text_input">Email</div>
          <input className="input_w" type="email" value={updateEmail} onChange={handleEmailChange} />
        </div>
        <br />
      </div>
      <button id="b_sign" onClick={UpdateToDB}>
        update profile
      </button>
      <div className="link2" onClick={NavMyClub}>
        Go to your clubs
      </div>
    </div>
  );
};

export default Profile;
