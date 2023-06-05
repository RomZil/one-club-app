import "./MyClubs.css";
import { Button, Col, Row } from "react-bootstrap";
import Search from "../../components/search/search";
import { Link } from "react-router-dom";
import {
  GET_LOYALTYCARD,
  GET_LOYALTYCARDS,
} from "../../components/queries/loyaltyCardQueries";
import { GET_DEALS } from "../../components/queries/dealQueries";
import { useQuery } from "@apollo/client";
import Spinner from "../../components/spinner/spinner";
import { MDBCheckbox } from "mdb-react-ui-kit";
import { useState } from "react";

export default function Clubs() {
  const { loading, error, data } = useQuery(GET_LOYALTYCARDS);
  const [myClubs, setMyClubs] = useState([]);

  function updateMyClubs() {
    //send the data to server
    console.log(myClubs);
  }

  // }
  if (loading) return <Spinner />;
  if (error) return <p>Somthing Went Wrong</p>;

  return (
    <Col id="container">
      <Row id="clubs" style={{ gridGap: 15 }}>
        <div id="title">My Clubs</div>
        <Link id="link" to="/Profile">
          Go to your profile
        </Link>

        {data.loyaltyCards.map((loyaltyCard) => (
          <div
            style={{
              display: "contents",
            }}
          >
            <div id="club">{loyaltyCard.name}</div>
            <MDBCheckbox
              onClick={() => setMyClubs([...myClubs, loyaltyCard.name])}
              onClickname="flexCheck"
              id="flexCheckDefault"
            />
          </div>
        ))}
      </Row>{" "}
      <div>{""}</div>
      <button id="b_sign" className="registerBtn" onClick={updateMyClubs}>
        UPDATE
      </button>
    </Col>
  );
}
