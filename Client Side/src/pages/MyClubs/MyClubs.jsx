import "./MyClubs.css";
import { Button, Col, Form, Row } from "react-bootstrap";
import Search from "../../components/search/search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  GET_LOYALTYCARD,
  GET_LOYALTYCARDS,
} from "../../components/queries/loyaltyCardQueries";
import { GET_DEALS } from "../../components/queries/dealQueries";
import { useMutation, useQuery } from "@apollo/client";
import Spinner from "../../components/spinner/spinner";
import { MDBCheckbox } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { UPDATE_USER_LOYALTY_CARD } from "../../components/mutations/userMutations";
import { GET_USER } from "../../components/queries/userQueries";

export default function MyClubs() {
  const nav = useNavigate();
  var cardsToSend = {};
  const { state } = useLocation();
  const { loading, error, data } = useQuery(GET_LOYALTYCARDS);
  const [userLoyaltyCards, setUserLoyaltyCards] = useState([]);
  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery(GET_USER);
  const [myClubs, setMyClubs] = useState([]);

  useEffect(() => {
    if (dataUser != undefined && data != undefined) {
      var allLoyaltyCards = data.getLoyaltyCards.map((card) => [
        card.id,
        false,
      ]);
      var userLoyaltyCards = dataUser.getUser.loyaltyCardId.map((card) => [
        card.id,
        true,
      ]);

      const resultArray = [];

      allLoyaltyCards.forEach(([id, flag]) => {
        const userCard = userLoyaltyCards.find((card) => card[0] === id);
        if (userCard) {
          resultArray.push([id, userCard[1]]);
        } else {
          resultArray.push([id, false]);
        }
      });
      setMyClubs(resultArray);
    }
  }, [dataUser, data]);

  const [updateUserLoyaltyCards] = useMutation(UPDATE_USER_LOYALTY_CARD);

  function updateMyClubs() {
    const tmp = myClubs
      .filter((line) => line[1] === true)
      .map(([id]) => ({ id: id.trim() }));

    cardsToSend = { cards: tmp };
    updateUserLoyaltyCards({ variables: cardsToSend });
    nav("/Home", { state: { title: null } });
  }

  function isChecked(idToFind) {
    const result = myClubs.find(([id, flag]) => id === idToFind);
    if (result) {
      const [, flag] = result;
      return flag;
    }
    return false;
  }

  function onChange(idToUpdate) {
    var x = myClubs.map(([id, flag]) => {
      if (id === idToUpdate) {
        return [id, !flag];
      }
      return [id, flag];
    });
    setMyClubs(x);
  }
  if (loading || loadingUser) return <Spinner />;
  if (error) return <p>Somthing Went Wrong</p>;

  return (
    <div className="page">
      <div id="container">
        <p id="titel2">My Clubs</p>

        <Form>
          <Row className="clubs">
            {data.getLoyaltyCards.map((loyaltyCard) => (
              <div
                key={loyaltyCard.id}
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
                  onChange={() => onChange(loyaltyCard.id)}
                  checked={isChecked(loyaltyCard.id)}
                  id="flexCheckDefault"
                />
              </div>
            ))}
          </Row>{" "}
          <div>{""}</div>
          <button id="b_sign" className="registerBtn" onClick={updateMyClubs}>
            UPDATE
          </button>
          {/* <div onClick={updateMyClubs}> update</div> */}
        </Form>
      </div>
      <Link className="link2" to="/Profile">
        Go to your profile
      </Link>
    </div>
  );
}
