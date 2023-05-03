import { Col, Row } from "react-bootstrap";

const ShowItem = ({ img, name }) => {
  return (
    <div>
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
