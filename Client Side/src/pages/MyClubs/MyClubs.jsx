import "./MyClubs.css";
import { Col, Row } from "react-bootstrap";
import Search from "../../components/search/search";
import { Link } from "react-router-dom";
import { GET_LOYALTYCARD, GET_LOYALTYCARDS } from "../../components/queries/loyaltyCardQueries";
import { GET_DEALS } from "../../components/queries/dealQueries";
import { useQuery } from '@apollo/client';
import Spinner from "../../components/spinner/spinner";



export default function Clubs() {

  const { loading, error, data } = useQuery(GET_LOYALTYCARDS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <Col id="container">
      <Row id="clubs" style={{ gridGap: 15 }}>
        <div id="title">My Clubs</div>
        <Link id="link" to="/Profile">
          Go to your profile
        </Link>
        {data.loyaltyCards.map((loyaltyCard) => (
          <div id="club">{loyaltyCard.name}</div>
        ))}
      </Row>{" "}
    </Col>
  );
};

