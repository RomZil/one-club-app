import "./MyClubs.css";
import { Col, Row } from "react-bootstrap";
import Search from "../../components/search/search";
import { Link } from "react-router-dom";

const MyClubs = () => {
  var Clubs = ["hever", "isracard"];

  return (
    <Col id="container">
      <Row id="clubs" style={{ gridGap: 15 }}>
        <div id="titel2">My Clubs</div>
        {Clubs.map((club) => (
          <div id="club">{club}</div>
        ))}
      </Row>{" "}
    </Col>
  );
};
export default MyClubs;
