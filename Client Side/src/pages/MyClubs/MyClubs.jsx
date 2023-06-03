import "./MyClubs.css";
import { Col, Row } from "react-bootstrap";
import Search from "../../components/search/search";
import { Link } from "react-router-dom";
import { GET_LOYALTYCARD, GET_LOYALTYCARDS } from "../../components/queries/loyaltyCardQueries";
import { useQuery } from '@apollo/client';


const MyClubs = () => {

  var Clubs = () => useQuery(GET_LOYALTYCARDS);

  return (
    <Col id="container">
      <Row id="clubs" style={{ gridGap: 15 }}>
        <div id="title">My Clubs</div>
        <Link id="link" to="/Profile">
          Go to your profile
        </Link>
        {Clubs.map((club) => (
          <div id="club">{club}</div>
        ))}
      </Row>{" "}
    </Col>
  );
};
export default MyClubs;
