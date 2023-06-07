import "./MyClubs.css";
import { Button, Col, Form, Row } from "react-bootstrap";
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
    <>
    <div id="container" >
      <div id="titel2">My Clubs</div>
      <br />
      <Link className="link2" to="/Profile">
        Go to your profile
      </Link>
      <br />
      <Form>
        <Row className="clubs" style={{ gridGap: 15 }}>
          {data.loyaltyCards.map((loyaltyCard) => (
            <div
              style={{
                display: "contents",
              }}
            >
              <Form.Group className="mb-3">
                <Form.Control
                  className="loyaltyCards"
                  disabled="true"
                  type="text"
                  placeholder={loyaltyCard.name}
                />
              </Form.Group>
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
      </Form>
      </div>
    </>
  );
}
