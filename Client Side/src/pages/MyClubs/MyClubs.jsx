import "./MyClubs.css";
import { Col, Row } from "react-bootstrap";
import Search from "../../components/search/search";

const MyClubs = () => {
  var Clubs = ["hever", "isracard"];

  return (
    <Col id="container">
      <Row id="clubs" style={{ marginLeft: 2, gridGap: 15 }}>
        <div id="head">My Clubs</div>
        {Clubs.map((club) => (
          <div id="club">{club}</div>
        ))}
      </Row>{" "}
    </Col>
  );
};
export default MyClubs;
