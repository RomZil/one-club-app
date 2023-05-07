import { Col, Row } from "react-bootstrap";
import Search from "../../components/search/search";
import "./ShowItem.css";

const ShowItem = ({ img, name }) => {
  return (
    <div className="container">
      <Search title={""} />
      <Col>
        <image src={img}></image>
      </Col>
      <Col>
        <Row>
          <p>{name}</p>
        </Row>
        <Row></Row>
      </Col>
    </div>
  );
};

export default ShowItem;
