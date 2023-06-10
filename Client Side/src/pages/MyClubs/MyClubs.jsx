import "./MyClubs.css";
import { Button, Col, Form, Row } from "react-bootstrap";
import Search from "../../components/search/search";
import { Link, useLocation } from "react-router-dom";
import {
  GET_LOYALTYCARD,
  GET_LOYALTYCARDS,
} from "../../components/queries/loyaltyCardQueries";
import { GET_DEALS } from "../../components/queries/dealQueries";
import { useMutation, useQuery } from "@apollo/client";
import Spinner from "../../components/spinner/spinner";
import { MDBCheckbox } from "mdb-react-ui-kit";
import { useState } from "react";
import { UPDATE_USER_LOYALTY_CARD } from "../../components/mutations/userMutations";

export default function MyClubs() {
  const { state } = useLocation();
  const { regMyClubs } = state;
  const { loading, error, data } = useQuery(GET_LOYALTYCARDS);
  const [
    updateUserLoyaltyCards,
    { loading: loadingUpdateUser, data: dataUpsteUset, error: errorUpdateUser },
  ] = useMutation(UPDATE_USER_LOYALTY_CARD);

  const [myClubs, setMyClubs] = useState([]);

  function updateMyClubs() {
    //send the data to server
    console.log(myClubs);
    console.log("regMyClubs", regMyClubs);
  }

  function IsMyClub(currClub) {
    let checked = false;
    console.log(regMyClubs);
    console.log(currClub);
    regMyClubs.forEach((club) => {
      if (club.id === currClub) {
        checked = true;
      }
    });
    return checked;
  }

  function onChecked(id, name) {
    const tmp = { id, name };
    console.log(tmp);
    // updateUserLoyaltyCards({
    //   variables: {
    //     loyaltyCardId: tmp,
    //   },
    // });
  }

  // }
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
                  <Form.Control
                    className="loyaltyCards"
                    disabled={true}
                    type="text"
                    placeholder={loyaltyCard.name}
                  />
                </Form.Group>
                <MDBCheckbox
                  onChange={onChecked(loyaltyCard.id, loyaltyCard.name)}
                  checked={IsMyClub(loyaltyCard.id)}
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
