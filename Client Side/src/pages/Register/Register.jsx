import { useNavigate } from "react-router-dom";

function RegisterToDB() {
  //Todo: save the info in DB
  //Todo: save userName in local DB
  const navigate = useNavigate();
  navigate("/Home");
}

const Register = () => {
  return (
    <div className="container">
      <p id="first">Create a new accounte</p>
      <p
        onClick={
          {
            //TOdo, sighn in
          }
        }
      >
        Already Register? Log in here{" "}
      </p>
      <p>Name </p> <input type="text" />
      <p>Name </p> <input type="text" />
      <p>Name </p> <input type="text" />
      <p>Name </p> <input type="text" />
      <button className="registerBtn" onClick={RegisterToDB}>
        Register
      </button>
    </div>
  );
};
export default Register;
