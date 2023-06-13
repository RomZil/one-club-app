// import "./Profile.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GET_USER } from "../../components/queries/userQueries";
import { useMutation, useQuery } from "@apollo/client";
import Spinner from "../../components/spinner/spinner";
import { UPDATE_USER } from "../../components/mutations/userMutations";

const Profile = () => {
  const [updateName, setNameValue] = useState("");
  const [updateEmail, setEmailValue] = useState("");
  const [updatePassword, setPasswordValue] = useState("");
  const [updateDate, setDateValue] = useState("");
  const navigate = useNavigate();
  const [
    updateUser,
    { loading: loadingUpdateUser, data: dataUpsteUset, error: errorUpdateUser },
  ] = useMutation(UPDATE_USER);

  const { loading, error: userError, data: userData } = useQuery(GET_USER);

  useEffect(() => {
    if (userData != undefined) {
      setNameValue(userData.getUser.name);
      setEmailValue(userData.getUser.email);
      setPasswordValue(null);
    }
  }, [userData]);

  if (userError) return <p>{userError.message}</p>;
  if (errorUpdateUser) return <p>{errorUpdateUser}</p>;

  if (loading) return <Spinner />;
  if (loadingUpdateUser) return <Spinner />;

  function UpdateToDB() {
    if (!updatePassword) {
      updateUser({
        variables: {
          name: String(updateName),
          email: String(updateEmail),
        },
      });
    } else {
      updateUser({
        variables: {
          name: String(updateName),
          email: String(updateEmail),
          password: String(updatePassword),
        },
      });
    }
    navigate("/Home", { state: { title: null } });
  }

  function NavMyClub() {
    navigate("/MyClubs", {
      state: { regMyClubs: userData.getUser.loyaltyCardId },
    });
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
        <div id="container_input">
          <div id="text_input">New Password</div>
          <input
            className="input_w"
            type="password"
            value={updatePassword}
            onChange={handlePasswordChange}
          />
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
