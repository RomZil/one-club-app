import "./MyClubs.css";
import { Button, Col, Form, Row } from "react-bootstrap";
import Search from "../../components/search/search";
import { Link, useLocation } from "react-router-dom";
import { GET_LOYALTYCARD, GET_LOYALTYCARDS } from "../../components/queries/loyaltyCardQueries";
import { GET_DEALS } from "../../components/queries/dealQueries";
import { useMutation, useQuery } from "@apollo/client";
import Spinner from "../../components/spinner/spinner";
import { MDBCheckbox } from "mdb-react-ui-kit";
import { useState } from "react";
import { UPDATE_USER_LOYALTY_CARD } from "../../components/mutations/userMutations";

export default function MyClubs() {
  var cardsToSend = {};
  const { state } = useLocation();
  const { loading, error, data } = useQuery(GET_LOYALTYCARDS);

  const [updateUserLoyaltyCards] = useMutation(UPDATE_USER_LOYALTY_CARD);

  const [myClubs, setMyClubs] = useState([]);

  function updateMyClubs(e) {
    // e.preventDefault();
    const x = {
      cards: { id: "", id: "" },
    };
    const tmp = myClubs.map((item) => {
      return { id: item };
    });
    cardsToSend = { cards: tmp };
    updateUserLoyaltyCards({ variables: cardsToSend });
    // console.log(cards);
  }

  if (loading) return <Spinner />;
  if (error) return <p>Somthing Went Wrong</p>;

  return (
    <>
      <div id="container">
        <div id="titel2">My Clubs</div>
        <br />
        <Link className="link2" to="/Profile">
          Go to your profile
        </Link>
        <br />
        <Form>
          <Row className="clubs" style={{ gridGap: 15 }}>
            {data.getLoyaltyCards.map((loyaltyCard) => (
              <div
                style={{
                  display: "contents",
                }}
              >
                <Form.Group className="mb-3">
                  <Form.Control className="loyaltyCards" disabled={true} type="text" placeholder={loyaltyCard.name} />
                </Form.Group>
                <MDBCheckbox
                  onChange={() => {
                    setMyClubs([...myClubs, loyaltyCard.id]);
                  }}
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
          <div onClick={updateMyClubs}> update</div>
        </Form>
      </div>
    </>
  );
}
