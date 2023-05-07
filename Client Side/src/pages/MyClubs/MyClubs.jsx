import "./MyClubs.css";
import { Col, Row } from "react-bootstrap";
import Search from "../../components/search/search";

const MyClubs = () => {
  var Clubs = ["hever", "isracard"];

  return (
    <Col>
      {/* <ShowItem img={"k"} name={"temp"}></ShowItem> */}
      <Row className="categories" style={{ marginLeft: 2, gridGap: 15 }}>
        {Clubs.map((club) => (
          <p>{club}</p>
        ))}
      </Row>{" "}
    </Col>
  );
};
export default MyClubs;
