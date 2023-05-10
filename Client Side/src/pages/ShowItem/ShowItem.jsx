import { Col, Row } from "react-bootstrap";
import Search from "../../components/search/search";
import "./ShowItem.css";
import { useLocation } from "react-router-dom";

const ShowItem = () => {
  const { state } = useLocation();
  const { img, name } = state;
  return (
    <div id="container">
      <Col>
        <Row>
          <img src={img}></img>
        </Row>
        <Row>
          <p>{name}</p>
        </Row>
        <Row></Row>
      </Col>
    </div>
  );
};

export default ShowItem;
